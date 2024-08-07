"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  FaArrowRight,
  FaHome,
  FaSearch,
  FaRegHeart,
  FaRegPlusSquare,
} from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { TfiVideoClapper } from "react-icons/tfi";
import { BsChatText } from "react-icons/bs";
import { usePathname } from "next/navigation";
const menus = [
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
    path: "/explore",
    name: "Jelajahi",
    icon: <MdOutlineExplore />,
  },
  {
    path: "/reels",
    name: "Reels",
    icon: <TfiVideoClapper />,
  },
  {
    path: "/messages",
    name: "Pesan",
    icon: <BsChatText />,
  },
  {
    path: "/notifications",
    name: "Notifikasi",
    icon: <FaRegHeart />,
  },
  {
    path: "/create",
    name: "Buat",
    icon: <FaRegPlusSquare />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="w-64 h-screen sticky top-0 border-r md:flex flex-col justify-between p-5 hidden">
      <div className="flex flex-col gap-3 w-full">
        <Link href="/">
          {" "}
          <img src="/logo.png" className="w-32" alt="Logo" />
        </Link>

        {menus.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`flex  gap-3 items-center p-3 hover:bg-gray-100 rounded-sm ${
              pathname === menu.path ? "bg-gray-100" : ""
            }`}
          >
            <span className="text-2xl">{menu.icon}</span>
            <span className="text-lg">{menu.name}</span>
          </Link>
        ))}
        <Link
          href={"/u/username"}
          className={`flex  gap-3 items-center p-3 hover:bg-gray-100 rounded-sm ${
            pathname.includes("/u/") ? "bg-gray-100" : ""
          }`}
        >
          <img src="/user.jpg" className="w-6 h-6 rounded-full" alt="" />
          <span className="text-lg">Profil</span>
        </Link>
      </div>

      <button className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-sm ">
        <FaArrowRight className="text-xl" />
        <span className="text-lg">keluar</span>
      </button>
    </div>
  );
};

export default Sidebar;
