import Image from "next/image";
import Link from "next/link";
import React from "react";

const SuggestionList = () => {
  return (
    <div className="w-full mt-5">
      <div className="flex justify-between">
        <h2 className="text-sm font-semibold text-slate-500">
          Suggested for you
        </h2>
        <button className="font-semibold text-sm">See All</button>
      </div>
      <div className="flex w-full flex-col gap-3 my-3">
        <div className="w-full flex justify-between gap-3 items-center">
          <Link href={"#"} className="flex items-center gap-3 ">
            <Image
              src={"/favicon-32x32.png"}
              width={50}
              height={50}
              alt="Profile"
              className="rounded-full"
            />
            <div>
              <h1 className="text-sm font-semibold">Instagram.com</h1>
              <p className="text-xs">instagram</p>
            </div>
          </Link>
          <div className="">
            <button className="text-sm text-blue-400 font-semibold">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionList;
