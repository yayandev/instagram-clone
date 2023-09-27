"use client";
import ModalPostOptions from "@/components/modal/post-options/ModalPostOptions";
import Spinner from "@/components/spinner/Spinner";
import Verify from "@/components/verify/Verify";
import { fetcher } from "@/utils/swr/fetcher";
import Image from "next/image";
import useSWR from "swr";
import { useState } from "react";
import { BsChat, BsSend } from "react-icons/bs";
import axios from "axios";
import Likes from "./Likes";
import ClientOnly from "@/components/layout/ClientOnly";
const Comments = ({ postId, count }: { postId: string; count: any }) => {
  const [comment, setComment] = useState("");
  const [isProccess, setisProccess] = useState(false);
  const { data, error, isLoading, mutate } = useSWR(
    `/api/comments?post_id=${postId}`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="w-full flex justify-center my-5">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center my-5">
        <h1>Error</h1>
      </div>
    );
  }

  if (!data.data) {
    return (
      <div className="w-full flex justify-center my-5">
        <h1 className="font-semibold">No comments</h1>
      </div>
    );
  }

  // ketika inputan di enter
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleComment();
    }
  };

  const handleComment = async () => {
    if (comment.length !== 0) {
      setisProccess(true);
      const res = await axios.post(`/api/comments`, {
        comment,
        postID: postId,
      });

      if (res.data.success) {
        mutate();
        setComment("");
      }
      setisProccess(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full border-b mt-2">
        <div className="flex gap-3 text-sm">
          <Likes postId={postId} />
          <span className="flex gap-1 items-center">
            <BsChat /> <span>{data.data.length} comments</span>
          </span>
        </div>
        <ClientOnly>
          <div className="w-full mt-2 flex justify-between text-sm">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-[90%] focus:outline-none"
              placeholder="Enter your comment"
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleComment} disabled={isProccess}>
              {isProccess ? <Spinner /> : <BsSend />}
            </button>
          </div>
        </ClientOnly>
      </div>
      <ClientOnly>
        <ModalPostOptions />
      </ClientOnly>
      <div className="w-full">
        {data.data.map((result: any, index: number) => (
          <div
            className="w-full p-3 mt-2 flex gap-2 border rounded"
            key={index}
          >
            <Image
              src={result.user?.image}
              width={50}
              height={50}
              alt="user"
              className="w-[50px] h-[50px] rounded-full"
            />
            <div className="">
              <h1 className="font-semibold flex items-center gap-1 text-sm">
                <span>{result.user?.username} </span>
                <Verify />
              </h1>
              <p className="text-xs">{result.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
