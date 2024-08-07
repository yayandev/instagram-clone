/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { BsChatText } from "react-icons/bs";
const NavTop = () => {
  return (
    <nav className="md:hidden sticky top-0 w-full bg-white px-3 py-1 border-b flex justify-between items-center z-30">
      <Link href={"/"}>
        <img src="/logo.png" className="h-16" alt="Logo" />
      </Link>
      <div className="flex gap-5 items-center">
        <Link href={"/notifications"} className="text-2xl">
          <FaRegHeart />
        </Link>
        <Link href={"/messages"} className="text-2xl">
          <BsChatText />
        </Link>
      </div>
    </nav>
  );
};

export default NavTop;
