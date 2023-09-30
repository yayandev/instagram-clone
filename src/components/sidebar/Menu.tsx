"use client";
import { useAuth } from "@/context/AuthContext";
import { useModalAddPost } from "@/context/ModalCreatePostContext";
import { useModalSettings } from "@/context/ModalSettingsContext";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  FaBars,
  FaFileVideo,
  FaHouse,
  FaRegCompass,
  FaRegHeart,
  FaRegMessage,
  FaRegSquarePlus,
  FaSistrix,
} from "react-icons/fa6";

const Menu = () => {
  const { setIsOpenModalAddPost } = useModalAddPost();
  const { setIsOpen } = useModalSettings();
  const { user, status }: any = useAuth();

  if (status !== "authenticated") {
    return (
      <div className="flex w-full justify-center items-center">
        <button
          onClick={() => signIn()}
          className="py-2 px-5 rounded bg-sky-500 text-white"
        >
          Sign in
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 mt-3">
      <Link
        href={"/"}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg font-semibold p-2 rounded-sm hover:bg-slate-200"
      >
        <FaHouse /> <span className="lg:block hidden">Home</span>
      </Link>
      <Link
        href={"/search"}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <FaSistrix /> <span className="lg:block hidden">Search</span>
      </Link>
      <Link
        href={"#"}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <FaRegCompass /> <span className="lg:block hidden">Explore</span>
      </Link>
      <Link
        href={"/reels"}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <FaFileVideo /> <span className="lg:block hidden">Reels</span>
      </Link>
      <Link
        href={"/messages"}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <FaRegMessage /> <span className="lg:block hidden">Messages</span>
      </Link>
      <Link
        href={"/notifications"}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <FaRegHeart /> <span className="lg:block hidden">Notifications</span>
      </Link>
      <button
        onClick={() => setIsOpenModalAddPost(true)}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <FaRegSquarePlus /> <span className="lg:block hidden">Create</span>
      </button>
      <Link
        href={`/u/${user?.username}`}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <Image
          src={user?.image}
          width={32}
          height={32}
          alt="profile"
          className="rounded-full w-[32px] h-[32px]"
        />{" "}
        <span className="lg:block hidden">Profile</span>
      </Link>
      <button
        onClick={() => setIsOpen(true)}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm  hover:bg-slate-200 absolute bottom-0 "
      >
        <FaBars />
        <span className="lg:block hidden">More</span>
      </button>
    </div>
  );
};

export default Menu;
