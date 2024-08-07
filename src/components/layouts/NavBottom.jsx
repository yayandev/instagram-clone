/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { FaHome, FaRegPlusSquare, FaSearch } from "react-icons/fa";
import { TfiVideoClapper } from "react-icons/tfi";

const menusMobile = [
  {
    path: "/",
    name: "Beranda",
    icon: <FaHome />,
  },
  {
    path: "/search",
    name: "Cari",
    icon: <FaSearch />,
  },
  {
    path: "/create",
    name: "Buat",
    icon: <FaRegPlusSquare />,
  },
  {
    path: "/reels",
    name: "Reels",
    icon: <TfiVideoClapper />,
  },
];

const NavBottom = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-3 border-t flex justify-around items-center z-30">
      {menusMobile.map((menu, index) => (
        <Link
          href={menu.path}
          key={index}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-2xl">{menu.icon}</span>
        </Link>
      ))}
      <Link href={"/u/username"} className="flex flex-col items-center gap-1">
        <img src="/user.jpg" className="w-8 h-8 rounded-full" alt="" />
      </Link>
    </nav>
  );
};

export default NavBottom;
