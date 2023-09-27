"use client";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import {
  BsBookmark,
  BsChat,
  BsDot,
  BsHeart,
  BsHeartFill,
  BsSend,
  BsThreeDots,
} from "react-icons/bs";
import FormComment from "./FormComment";
import Link from "next/link";
import ModalPostOptions from "../modal/post-options/ModalPostOptions";
import { useModalPostOptions } from "@/context/ModalPostOptionsContext";
import ModalComments from "../modal/comments/ModalComments";
import useSWR from "swr";
import { fetcher } from "@/utils/swr/fetcher";
import { useRef, useState } from "react";
import { useModalAddPost } from "@/context/ModalCreatePostContext";
import Verify from "../verify/Verify";
import Spinner from "../spinner/Spinner";
import Skeleton from "./Skeleton";
import { useAuth } from "@/context/AuthContext";
import { LikePost } from "@/hooks/LikePost";
import { Dislike } from "@/hooks/Dislike";
import { formatRelativeTime } from "@/helpers/formatRelativeTime";
const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const PostsList = () => {
  const { user }: any = useAuth();
  let imageSliderRef: any = useRef<Slider | null>(null);
  const { setIsOpen, setPostId, setAuthor } = useModalPostOptions();
  const { setIsOpenModalAddPost } = useModalAddPost();
  const [isLoad, setIsLoad] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [take, setTake] = useState(5);
  const { data, isLoading, error, mutate } = useSWR(
    `/api/posts?take=${take}`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="w-full mt-5">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

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

  if (data?.data?.length === 0) {
    return (
      <div className="w-full mt-5">
        <h1 className="text-2xl text-center">No posts found!</h1>
      </div>
    );
  }

  return (
    <div className="w-full mb-10">
      <div className="w-full md:px-10 ">
        {data?.data.map((post: any, index: number) => {
          let likes: any = [];
          post.likes.map((like: any) => {
            likes.push(like.userID);
          });

          let date = new Date(post.createdAt);

          return (
            <div className="w-full my-2" key={index}>
              {/* header post */}
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
              </div>
              {/* media post */}
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
              {/* like post */}
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
              <FormComment postId={post.id} />
            </div>
          );
        })}
      </div>
      {data?.nextPage && (
        <div className="w-full flex justify-center mt-5 mb-10">
          <button
            onClick={() => {
              setTake(take + 5);
            }}
            className="text-sm p-2 rounded border"
          >
            {isLoad ? <Spinner /> : "More"}
          </button>
        </div>
      )}
      <ModalComments />
      <ModalPostOptions />
    </div>
  );
};

export default PostsList;
