"use client";

import Spinner from "@/components/spinner/Spinner";
import { useAuth } from "@/context/AuthContext";
import { Dislike } from "@/hooks/Dislike";
import { LikePost } from "@/hooks/LikePost";
import { fetcher } from "@/utils/swr/fetcher";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import useSWR from "swr";

const Likes = ({ postId }: { postId: string }) => {
  const { user }: any = useAuth();
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const { data, error, isLoading, mutate } = useSWR(
    `/api/count/${postId}`,
    fetcher
  );

  let likes: any = [];
  data?.data?.likes.map((like: any) => {
    likes.push(like.userID);
  });

  if (isLoading) return <Spinner />;

  const handleLike = async (postId: string) => {
    setIsLike(true);
    const data = await LikePost(postId);
    mutate();
    setIsLike(false);
  };

  const handleDislike = async (postId: string) => {
    setIsDislike(true);
    const data = await Dislike(postId);
    mutate();
    setIsDislike(false);
  };
  return (
    <>
      {likes.includes(user.id) ? (
        <span className="flex gap-1 items-center">
          <button
            onClick={() => handleDislike(postId)}
            disabled={isDislike}
            className="text-pink-600"
          >
            {isDislike ? <Spinner /> : <BsHeartFill />}
          </button>
          <span>{data?.data?._count?.likes} likes</span>
        </span>
      ) : (
        <span className="flex gap-1 items-center">
          <button onClick={() => handleLike(postId)} disabled={isLike}>
            {isLike ? <Spinner /> : <BsHeart />}
          </button>
          <span>{data?.data?._count?.likes} likes</span>
        </span>
      )}
    </>
  );
};

export default Likes;
