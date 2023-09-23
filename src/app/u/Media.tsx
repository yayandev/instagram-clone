"use client";
import Link from "next/link";
import { useState } from "react";
import { BsChat, BsHeart } from "react-icons/bs";

const Media = () => {
  const [activeTab, setActiveTab] = useState("posts");
  return (
    <div className="w-full mt-10 border-t-2">
      <div className="w-full flex justify-center gap-10">
        <button
          onClick={() => setActiveTab("posts")}
          className={
            activeTab === "posts"
              ? "font-[500] border-t-2 border-black"
              : "font-[500]"
          }
        >
          POSTS
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={
            activeTab === "saved"
              ? "font-[500] border-t-2 border-black"
              : "font-[500]"
          }
        >
          SAVED
        </button>
        <button
          onClick={() => setActiveTab("tagged")}
          className={
            activeTab === "tagged"
              ? "font-[500] border-t-2 border-black"
              : "font-[500]"
          }
        >
          TAGGED
        </button>
      </div>
      {activeTab === "posts" && (
        <div className="w-full flex justify-center flex-wrap p-10 gap-3">
          <Link
            href={"#"}
            className="border lg:w-[300px] lg:h-[300px] w-[100px] h-[100px]  flex items-center justify-center bg-[url(/post.jpg)] bg-cover bg-center  rounded-sm"
          >
            <div className="w-full h-full justify-center items-center hidden md:flex">
              <div className="flex gap-3">
                <button className="p-3 bg-white text-black rounded">
                  <BsHeart />
                </button>
                <button className="p-3 bg-white text-black rounded">
                  <BsChat />
                </button>
              </div>
            </div>
          </Link>
          <Link
            href={"#"}
            className="border lg:w-[300px] lg:h-[300px] w-[100px] h-[100px]  flex items-center justify-center bg-[url(/post.jpg)] bg-cover bg-center  rounded-sm"
          >
            <div className="w-full h-full justify-center items-center hidden md:flex">
              <div className="flex gap-3">
                <button className="p-3 bg-white text-black rounded">
                  <BsHeart />
                </button>
                <button className="p-3 bg-white text-black rounded">
                  <BsChat />
                </button>
              </div>
            </div>
          </Link>
          <Link
            href={"#"}
            className="border lg:w-[300px] lg:h-[300px] w-[100px] h-[100px]  flex items-center justify-center bg-[url(/post.jpg)] bg-cover bg-center  rounded-sm"
          >
            <div className="w-full h-full justify-center items-center hidden md:flex">
              <div className="flex gap-3">
                <button className="p-3 bg-white text-black rounded">
                  <BsHeart />
                </button>
                <button className="p-3 bg-white text-black rounded">
                  <BsChat />
                </button>
              </div>
            </div>
          </Link>
        </div>
      )}
      {activeTab === "saved" && (
        <div className="w-full p-10">
          <h1>saved</h1>
        </div>
      )}
      {activeTab === "tagged" && (
        <div className="w-full p-10">
          <h1>TAGGED</h1>
        </div>
      )}
    </div>
  );
};

export default Media;
