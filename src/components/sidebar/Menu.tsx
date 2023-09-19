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
  return (
    <div className="flex flex-col gap-4 mt-3">
      <Link
        href={"#"}
        className="flex gap-3 items-center justify-start text-lg font-semibold p-2 rounded-sm hover:bg-slate-200"
      >
        <FaHouse /> <span>Home</span>
      </Link>
      <Link
        href={"#"}
        className="flex gap-3 items-center justify-start text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <FaSistrix /> <span>Search</span>
      </Link>
      <Link
        href={"#"}
        className="flex gap-3 items-center justify-start text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <FaRegCompass /> <span>Explore</span>
      </Link>
      <Link
        href={"#"}
        className="flex gap-3 items-center justify-start text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <FaFileVideo /> <span>Reels</span>
      </Link>
      <Link
        href={"#"}
        className="flex gap-3 items-center justify-start text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <FaRegMessage /> <span>Messages</span>
      </Link>
      <Link
        href={"#"}
        className="flex gap-3 items-center justify-start text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <FaRegHeart /> <span>Notifications</span>
      </Link>
      <Link
        href={"#"}
        className="flex gap-3 items-center justify-start text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <FaRegSquarePlus /> <span>Create</span>
      </Link>
      <Link
        href={"#"}
        className="flex gap-3 items-center justify-start text-lg  p-2 rounded-sm hover:bg-slate-200"
      >
        <Image
          src={"/favicon-32x32.png"}
          width={32}
          height={32}
          alt="profile"
        />{" "}
        <span>Profile</span>
      </Link>
      <Link
        href={"#"}
        className="flex gap-3 items-center justify-start text-lg  p-2 rounded-sm  hover:bg-slate-200 absolute bottom-0 "
      >
        <FaBars />
        <span>More</span>
      </Link>
    </div>
  );
};

export default Menu;
