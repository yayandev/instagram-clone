"use client";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaRegMessage } from "react-icons/fa6";
import ClientOnly from "../layout/ClientOnly";
import PublicOnly from "../layout/PublicOnly";

const NavTop = () => {
  return (
    <>
      <div className="md:hidden max-h-[60px] fixed top-0 w-full border-b-2 bg-white p-2 flex items-center justify-between z-50">
        <div>
          <Link href={"/"}>
            <Image
              src={"/logo-nobg.png"}
              width={100}
              height={50}
              alt="instagram"
            />
          </Link>
        </div>
        <ClientOnly>
          <div className="flex gap-3">
            <Link
              href={"#"}
              className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
            >
              <FaRegHeart />
            </Link>
            <Link
              href={"#"}
              className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
            >
              <FaRegMessage />
            </Link>
          </div>
        </ClientOnly>
        <PublicOnly>
          <button className="py-2 px-5 rounded bg-sky-500 text-white">
            Sign in
          </button>
        </PublicOnly>
      </div>
      <div className="md:hidden h-[50px]"></div>
    </>
  );
};

export default NavTop;
