"use client";
import Spinner from "@/components/spinner/Spinner";
import { useAuth } from "@/context/AuthContext";
import { useModalPostOptions } from "@/context/ModalPostOptionsContext";
import { DeletePost } from "@/hooks/DeletePost";
import { unFollow } from "@/hooks/unFollow";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ModalPostOptions = () => {
  const { isOpen, setIsOpen, postId, author }: any = useModalPostOptions();
  const { user }: any = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [notif, setNotif] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const router = useRouter();
  const handleUnFollow = async () => {
    setIsLoading(true);
    const data = await unFollow(author?.id);
    if (data.success) {
      router.refresh();
    }
    setIsOpen(false);
    setIsLoading(false);
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
        {user.id !== author?.id && (
          <div className="w-full flex justify-center border-b-2">
            <button
              disabled={isLoading}
              onClick={handleUnFollow}
              className=" text-red-500 p-2 text-sm"
            >
              {isLoading ? <Spinner /> : "Unfollow"}
            </button>
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
