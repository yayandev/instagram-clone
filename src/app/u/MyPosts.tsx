"use client";
import ClientOnly from "@/components/layout/ClientOnly";
import PublicOnly from "@/components/layout/PublicOnly";
import ModalPostOptions from "@/components/modal/post-options/ModalPostOptions";
import FormComment from "@/components/posts/FormComment";
import Spinner from "@/components/spinner/Spinner";
import Verify from "@/components/verify/Verify";
import { useAuth } from "@/context/AuthContext";
import { useModalPostOptions } from "@/context/ModalPostOptionsContext";
import { formatRelativeTime } from "@/helpers/formatRelativeTime";
import { Dislike } from "@/hooks/Dislike";
import { LikePost } from "@/hooks/LikePost";
import { fetcher } from "@/utils/swr/fetcher";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BsBookmark,
  BsChat,
  BsDot,
  BsHeart,
  BsHeartFill,
  BsSend,
  BsThreeDots,
} from "react-icons/bs";
import useSWR from "swr";

const MyPosts = ({ userId }: { userId: string }) => {
  const { user }: any = useAuth();
  const [isLoad, setIsLoad] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const { setIsOpen, setPostId, setAuthor } = useModalPostOptions();
  const { data, error, isLoading, mutate } = useSWR(
    `/api/myposts/${userId}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;

  if (isLoading) {
    return (
      <div className="w-full flex justify-center mt-16">
        <Spinner />
      </div>
    );
  }

  if (data?.data?.length === 0) {
    return (
      <div className="w-full">
        <h1 className="font-bold text-2xl text-center">No Posts Found!</h1>
      </div>
    );
  }

  const handleLike = async (postId: string) => {
    setIsLike(true);
    const data = await LikePost(postId);
    if (data.success) {
      mutate();
    }
    setIsLike(false);
  };

  const handleDislike = async (postId: string) => {
    setIsDislike(true);
    const data = await Dislike(postId);
    if (data.success) {
      mutate();
    }
    setIsDislike(false);
  };

  return (
    <div className="w-full flex flex-col gap-3 max-w-xl mx-auto">
      {data?.data?.map((post: any) => {
        let likes: any = [];
        post.likes.map((like: any) => {
          likes.push(like.userID);
        });
        let date = new Date(post.createdAt);
        return (
          <div key={post.id} className="w-full">
            {/* head */}
            <div className="w-full flex justify-between">
              <div className="flex gap-2 items-center">
                <Link href={`/u/${post.user.username}`}>
                  <Image
                    src={post.user.image}
                    width={40}
                    height={40}
                    alt={"Profile"}
                    className="rounded-full"
                  />
                </Link>
                <h3 className="text-sm font-semibold flex items-center gap-1">
                  <Link
                    href={`/u/${post.user.username}`}
                    className="flex items-center gap-1"
                  >
                    <div>{post.user.username}</div>
                    {post.user.isVerify && <Verify />}
                  </Link>{" "}
                  <BsDot />{" "}
                  <span className="font-semibold text-sm text-slate-400">
                    {formatRelativeTime(date)}
                  </span>
                </h3>
              </div>
              <ClientOnly>
                <button
                  className="font-bold text-lg"
                  onClick={() => {
                    setAuthor(post.user);
                    setPostId(post.id);
                    setIsOpen(true);
                  }}
                >
                  <BsThreeDots />
                </button>
              </ClientOnly>
            </div>
            {/* images */}
            <div className="w-full flex justify-center my-3">
              <div className="w-full max-h-[350px] object-contain">
                <Image
                  src={post.images}
                  width={300}
                  height={250}
                  className="w-full max-h-[350px] object-contain"
                  alt="Post"
                />
              </div>
            </div>
            {/* menu post */}
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <ClientOnly>
                  <>
                    {likes.includes(user?.id) ? (
                      <button
                        disabled={isDislike}
                        onClick={() => handleDislike(post.id)}
                        className="text-xl font-bold text-pink-700"
                      >
                        {isDislike ? <Spinner /> : <BsHeartFill />}
                      </button>
                    ) : (
                      <button
                        disabled={isLike}
                        onClick={() => handleLike(post.id)}
                        className="text-xl font-bold"
                      >
                        {isLike ? <Spinner /> : <BsHeart />}
                      </button>
                    )}
                  </>
                </ClientOnly>
                <PublicOnly>
                  <Link
                    href={`/login?callbackUrl=/p/${post.id}`}
                    className="text-xl font-bold"
                  >
                    <BsHeart />
                  </Link>
                </PublicOnly>
                <Link
                  href={`/p/${post.id}`}
                  className="text-xl font-bold text-center flex gap-1 items-center"
                >
                  {post._count.comments > 0 && (
                    <span className="text-sm">{post._count.comments}</span>
                  )}
                  <BsChat />
                </Link>
                <button className="text-xl font-bold">
                  <BsSend />
                </button>
              </div>
              <button className="text-xl font-bold">
                <BsBookmark />
              </button>
            </div>
            <div className="w-full my-2">
              <div className="flex gap-3">
                {post._count.likes > 0 && (
                  <Link href={`/p/${post.id}`} className="text-sm font-bold">
                    {post._count.likes} likes
                  </Link>
                )}
                {post._count.comments > 0 && (
                  <Link href={`/p/${post.id}`} className="text-sm font-bold">
                    {post._count.comments} comments
                  </Link>
                )}
              </div>
              <div className="my-1">
                <p>{post.caption}</p>
              </div>
            </div>
            {/* form comment */}
            <ClientOnly>
              <FormComment postId={post.id} />
            </ClientOnly>
            <PublicOnly>
              <div className="w-full border-b-2 py-1"></div>
            </PublicOnly>
          </div>
        );
      })}
      <ClientOnly>
        <ModalPostOptions />
      </ClientOnly>
    </div>
  );
};

export default MyPosts;
