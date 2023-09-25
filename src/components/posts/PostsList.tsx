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
  BsSend,
  BsThreeDots,
} from "react-icons/bs";
import FormComment from "./FormComment";
import Link from "next/link";
import ModalPostOptions from "../modal/post-options/ModalPostOptions";
import { useModalPostOptions } from "@/context/ModalPostOptionsContext";
import ModalComments from "../modal/comments/ModalComments";
import { useModalComments } from "@/context/ModalCommentsContext";
import useSWR from "swr";
import { fetcher } from "@/utils/swr/fetcher";
import { useRef } from "react";
import { useModalAddPost } from "@/context/ModalCreatePostContext";
import Verify from "../verify/Verify";
const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const PostsList = () => {
  let imageSliderRef: any = useRef<Slider | null>(null);
  const { setIsOpen, setPostId, setAuthor } = useModalPostOptions();
  const { setIsOpenModalAddPost } = useModalAddPost();
  const { setIsOpenModalComments } = useModalComments();
  const { data, isLoading, error } = useSWR("/api/posts", fetcher);

  if (isLoading) return <h1>loading...</h1>;

  if (data?.data?.length === 0) {
    return (
      <div className="w-full my-3 flex justify-center  p-3 rounded border-2">
        <div className="">
          <p className="font-semibold">
            Buat postingan pertama anda atau cari teman anda!
          </p>
          <div className="flex mt-2 gap-2">
            <button
              className="p-2 border text-sm"
              onClick={() => setIsOpenModalAddPost(true)}
            >
              Create post
            </button>
            <button className="p-2 border text-sm">Search for friends</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="w-full md:px-10 ">
        {data?.data.map((post: any, index: number) => {
          let images = JSON.parse(post.images);
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
                      2d
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
                <Slider
                  {...settings}
                  ref={imageSliderRef}
                  className="w-full max-h-[350px] object-contain"
                >
                  {images.map((image: any, index: number) => (
                    <Image
                      key={index}
                      src={image.secure_url}
                      width={300}
                      height={250}
                      className="w-full max-h-[350px] object-contain"
                      alt="Post"
                    />
                  ))}
                </Slider>
              </div>
              {/* menu post */}
              <div className="w-full flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <button className="text-xl font-bold">
                    <BsHeart />
                  </button>
                  <button
                    className="text-xl font-bold"
                    onClick={() => setIsOpenModalComments(true)}
                  >
                    <BsChat />
                  </button>
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
                <button className="text-sm font-bold">10 likes</button>
                <div className="my-1">
                  <p>{post.caption}</p>
                </div>
              </div>
              {/* form comment */}
              <FormComment />
            </div>
          );
        })}
      </div>
      <ModalComments />
      <ModalPostOptions />
    </>
  );
};

export default PostsList;
