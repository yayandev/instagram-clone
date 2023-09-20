"use client";
import { useModalAddPost } from "@/context/ModalCreatePostContext";
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
  return (
    <div className="flex flex-col gap-4 mt-3">
      <Link
        href={"/"}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg font-semibold p-2 rounded-sm hover:bg-slate-200"
      >
        <FaHouse /> <span className="lg:block hidden">Home</span>
      </Link>
      <Link
        href={"#"}
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
        href={"#"}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <FaFileVideo /> <span className="lg:block hidden">Reels</span>
      </Link>
      <Link
        href={"#"}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <FaRegMessage /> <span className="lg:block hidden">Messages</span>
      </Link>
      <Link
        href={"#"}
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
        href={"#"}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <Image
          src={"/favicon-32x32.png"}
          width={32}
          height={32}
          alt="profile"
        />{" "}
        <span className="lg:block hidden">Profile</span>
      </Link>
      <Link
        href={"#"}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm  hover:bg-slate-200 absolute bottom-0 "
      >
        <FaBars />
        <span className="lg:block hidden">More</span>
      </Link>
    </div>
  );
};

export default Menu;
