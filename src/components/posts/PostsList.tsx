"use client";
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
const posts = [
  {
    id: 1,
    image: "/post.jpg",
    profile: "/default-pp.png",
    username: "yanz20.ig",
    caption: "My first post",
    likes: 152,
  },
  {
    id: 2,
    image: "/post.jpg",
    profile: "/default-pp.png",
    username: "yanz20.ig",
    caption: "My first post",
    likes: 152,
  },
  {
    id: 3,
    image: "/post.jpg",
    profile: "/default-pp.png",
    username: "yanz20.ig",
    caption: "My first post",
    likes: 152,
  },
];
const PostsList = () => {
  const { setIsOpen } = useModalPostOptions();
  const { setIsOpenModalComments } = useModalComments();
  return (
    <>
      <div className="w-full md:px-10 ">
        {posts.map((post) => (
          <div className="w-full my-2" key={post.id}>
            {/* header post */}
            <div className="w-full flex justify-between">
              <div className="flex gap-2 items-center">
                <Link href={"#"}>
                  <Image
                    src={post.profile}
                    width={40}
                    height={40}
                    alt={"Profile"}
                    className="rounded-full"
                  />
                </Link>
                <h3 className="text-sm font-semibold flex items-center gap-1">
                  <Link href={"#"}>{post.username}</Link> <BsDot />{" "}
                  <span className="font-semibold text-sm text-slate-400">
                    2d
                  </span>
                </h3>
              </div>
              <button
                className="font-bold text-lg"
                onClick={() => setIsOpen(true)}
              >
                <BsThreeDots />
              </button>
            </div>
            {/* media post */}
            <div className="w-full my-3">
              <Image
                src={post.image}
                width={200}
                height={200}
                className="w-full border rounded-sm"
                alt="Post"
              />
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
              <button className="text-sm font-bold">{post.likes} likes</button>
            </div>
            {/* form comment */}
            <FormComment />
          </div>
        ))}
      </div>
      <ModalComments />
      <ModalPostOptions />
    </>
  );
};

export default PostsList;
