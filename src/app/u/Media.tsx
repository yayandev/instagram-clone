"use client";
import { useState } from "react";
import MyPosts from "./MyPosts";

const Media = ({ userId }: { userId: string }) => {
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
        <div className="w-full">
          <MyPosts userId={userId} />
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
