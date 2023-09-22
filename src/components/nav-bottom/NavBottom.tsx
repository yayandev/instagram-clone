"use client";
import { useModalAddPost } from "@/context/ModalCreatePostContext";
import Image from "next/image";
import Link from "next/link";
import { BsPlusSquare } from "react-icons/bs";
import { FaFileVideo, FaHouse, FaSistrix } from "react-icons/fa6";

const NavBottom = ({ user }: any) => {
  const { setIsOpenModalAddPost } = useModalAddPost();
  return (
    <div className="md:hidden fixed bottom-0 w-full border-t-2 bg-white flex p-3 justify-between max-h-[60px]">
      <Link
        href={"/"}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg font-semibold p-2 rounded-sm hover:bg-slate-200"
      >
        <FaHouse />
      </Link>
      <Link
        href={"#"}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg font-semibold p-2 rounded-sm hover:bg-slate-200"
      >
        <FaSistrix />
      </Link>
      <button
        onClick={() => setIsOpenModalAddPost(true)}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg font-semibold p-2 rounded-sm hover:bg-slate-200"
      >
        <BsPlusSquare />
      </button>
      <Link
        href={"#"}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg font-semibold p-2 rounded-sm hover:bg-slate-200"
      >
        <FaFileVideo />
      </Link>
      <Link
        href={`/u/${user.username}`}
        className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <Image
          src={`${user.image}`}
          width={32}
          height={32}
          alt="profile"
          className="rounded-full"
        />{" "}
      </Link>
    </div>
  );
};

export default NavBottom;
