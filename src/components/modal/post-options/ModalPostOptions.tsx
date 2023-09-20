"use client";
import { useModalPostOptions } from "@/context/ModalPostOptionsContext";
import React from "react";

const ModalPostOptions = () => {
  const { isOpen, setIsOpen } = useModalPostOptions();
  return (
    <div
      className={
        isOpen
          ? "backdrop-brightness-75 fixed w-full h-full  top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center"
          : "hidden"
      }
    >
      <div className="bg-white w-[300px] rounded shadow flex flex-col">
        <button className="border-b-2 text-red-500 p-2 text-sm">Report</button>
        <button className="border-b-2 text-red-500 p-2 text-sm">
          Unfollow
        </button>
        <button className="border-b-2 p-2 text-sm">Add to favorites</button>
        <button className="border-b-2 p-2 text-sm">Go to post</button>
        <button className="border-b-2 p-2 text-sm">Share to...</button>
        <button className="border-b-2 p-2 text-sm">Copy link</button>
        <button className="border-b-2 p-2 text-sm">About this account</button>
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
