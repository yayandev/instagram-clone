"use client";
import { useModalAddPost } from "@/context/ModalCreatePostContext";
import Image from "next/image";
import { useState } from "react";
import { BsImage, BsTrash, BsX } from "react-icons/bs";

const ModalAddPosts = () => {
  const [values, setValues] = useState({
    image: "",
    idImage: "",
    caption: "",
  });
  const { isOpenModalAddPost, setIsOpenModalAddPost } = useModalAddPost();
  return (
    <div
      className={
        isOpenModalAddPost
          ? "backdrop-brightness-75 fixed w-full h-full  top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center"
          : "hidden"
      }
    >
      <div className="w-[90%] md:w-[340px] rounded shadow p-3 bg-white">
        <div className="flex justify-between items-center pb-3 border-b-2">
          <h1 className="text-sm font-semibold">Create new post</h1>
          <button
            className="text-2xl font-semibold"
            onClick={() => setIsOpenModalAddPost(false)}
          >
            <BsX />
          </button>
        </div>
        <div className="w-full py-5">
          {values.idImage.length === 0 ? (
            <div className="w-full flex justify-center">
              <button className="flex items-center gap-3 justify-center p-2 rounded bg-sky-500 text-white">
                <BsImage /> <span>Select a photo</span>
              </button>
            </div>
          ) : (
            <div className="w-full">
              <div className="w-full">
                <div className="w-full flex justify-between items-start">
                  <Image
                    src={"/post.png"}
                    width={200}
                    height={200}
                    className="border"
                    alt="post image"
                  />
                  <button className="p-2 rounded bg-red-500 text-white">
                    <BsTrash />
                  </button>
                </div>
                <button className="text-sm font-semibold mt-3 underline">
                  Next {">>"}
                </button>
              </div>
              <div className="w-full hidden">
                <div className="w-full">
                  <label>Caption</label>
                  <textarea className="w-full border focus:outline-none p-3 h-[150px]"></textarea>
                </div>
                <div className="flex justify-between items-center">
                  <button className="text-sm font-semibold mt-3 underline">
                    {"<< "}Prev
                  </button>
                  <button className="text-sm font-semibold mt-3 text-sky-500 p-2 border border-sky-500 rounded-sm">
                    Share
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalAddPosts;
