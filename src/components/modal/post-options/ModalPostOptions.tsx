"use client";
import Spinner from "@/components/spinner/Spinner";
import { useAuth } from "@/context/AuthContext";
import { useModalPostOptions } from "@/context/ModalPostOptionsContext";
import { DeletePost } from "@/hooks/DeletePost";
import { Follow } from "@/hooks/Follow";
import { unFollow } from "@/hooks/unFollow";
import { fetcher } from "@/utils/swr/fetcher";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";

const ModalPostOptions = () => {
  const { isOpen, setIsOpen, postId, author }: any = useModalPostOptions();
  const { data, error, isLoading } = useSWR(
    `/api/users?id=${author?.id}`,
    fetcher
  );
  const { user }: any = useAuth();
  const [isProccess, setisProccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [notif, setNotif] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const router = useRouter();
  const handleUnFollow = async () => {
    setisProccess(true);
    const data = await unFollow(author?.id);
    if (data.success) {
      router.refresh();
    }
    setIsOpen(false);
    setisProccess(false);
  };

  const handleFollow = async () => {
    setisProccess(true);
    const data = await Follow(author?.id);
    if (data.success) {
      router.refresh();
    }
    setIsOpen(false);
    setisProccess(false);
  };

  const handleDeletePost = async () => {
    setIsDeleted(true);
    const data = await DeletePost(postId);
    setIsDeleted(false);
    if (data.success) {
      setNotif("");
      setMsg("");
      setNotif("");
      setMsg("");
      router.push("/");
      setIsOpen(false);
    } else {
      setNotif("text-red-500");
      setMsg(data.message);
    }
  };

  return (
    <div
      className={
        isOpen
          ? "backdrop-brightness-75 fixed w-full h-full  top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center"
          : "hidden"
      }
    >
      <div className="bg-white w-[300px] rounded shadow flex flex-col">
        {msg && <p className={"text-center font-semibold " + notif}>{msg}</p>}
        <button className="border-b-2 text-red-500 p-2 text-sm">Report</button>
        {isLoading ? (
          <div className="w-full flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="w-full">
            {user.id !== author?.id && (
              <div className="w-full flex justify-center border-b-2">
                {data?.data?.followedByIDs.includes(user.id) ? (
                  <button
                    disabled={isProccess}
                    onClick={handleUnFollow}
                    className=" text-red-500 p-2 text-sm"
                  >
                    {isProccess ? <Spinner /> : "Unfollow"}
                  </button>
                ) : (
                  <button
                    disabled={isProccess}
                    onClick={handleFollow}
                    className=" text-sky-500 p-2 text-sm"
                  >
                    {isProccess ? <Spinner /> : "Follow"}
                  </button>
                )}
              </div>
            )}
            {user.id === author?.id && (
              <div className="w-full flex justify-center">
                <button
                  disabled={isDeleted}
                  onClick={handleDeletePost}
                  className=" text-red-500 p-2 text-sm"
                >
                  {isDeleted ? <Spinner /> : "Delete post"}
                </button>
              </div>
            )}
          </div>
        )}
        <button className="border-b-2 p-2 text-sm">Add to favorites</button>
        <button
          className="border-b-2 p-2 text-sm"
          onClick={() => {
            router.push(`/p/${postId}`);
            setIsOpen(false);
          }}
        >
          Go to post
        </button>
        <button className="border-b-2 p-2 text-sm">Share to...</button>
        <button className="border-b-2 p-2 text-sm">Copy link</button>
        <Link
          href={`/u/${author?.username}`}
          className="border-b-2 p-2 text-sm text-center"
        >
          About this account
        </Link>
        <button
          className="border-b-2 p-2 text-sm"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalPostOptions;
