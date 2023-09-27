"use client";
import axios from "axios";
import { useState } from "react";
import Spinner from "../spinner/Spinner";
import { BsSend } from "react-icons/bs";
import { useRouter } from "next/navigation";

const FormComment = ({ postId }: { postId: string }) => {
  const [isProccess, setisProccess] = useState(false);
  const [comment, setComment] = useState("");
  const router = useRouter();
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
        setComment("");
        router.push(`/p/${postId}`);
      }
    }
  };
  return (
    <div className="w-full mt-2 flex justify-between text-sm border-b-2">
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
  );
};

export default FormComment;
