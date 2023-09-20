import Image from "next/image";
import Link from "next/link";
import { FaGear, FaPencil } from "react-icons/fa6";

const Profile = () => {
  return (
    <div className="w-full flex gap-10 px-10 py-5">
      {/* image */}
      <Image
        src={"/user.jpg"}
        width={150}
        height={150}
        alt="User"
        className="rounded-full md:w-[150px] md:h-[150px] w-[65px] h-[65px]"
      />
      {/* data  */}
      <div>
        <div className="gap-5 items-center md:flex hidden">
          <h1 className="font-semibold text-lg">yanz20.ig</h1>
          <button className="p-2 rounded bg-slate-200 text-sm font-semibold hover:opacity-75">
            <span className="md:block hidden">Edit profile</span>
            <span className="md:hidden block">
              <FaPencil />
            </span>
          </button>
          <button className="font-bold text-lg">
            <FaGear />
          </button>
        </div>
        <div className="flex items-center gap-3 my-3">
          <Link href={"#"} className="font-semibold">
            6 <span className="text-sm text-slate-700">posts</span>
          </Link>
          <Link href={"#"} className="font-semibold">
            600 <span className="text-sm text-slate-700">followers</span>
          </Link>
          <Link href={"#"} className="font-semibold">
            60 <span className="text-sm text-slate-700">following</span>
          </Link>
        </div>
        <div className="w-full">
          <p>No Bio Nyet!</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
