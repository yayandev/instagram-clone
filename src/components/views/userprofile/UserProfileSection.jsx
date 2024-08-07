import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { FaGear } from "react-icons/fa6";

/* eslint-disable @next/next/no-img-element */
const UserProfileSection = () => {
  return (
    <>
      <div className="w-full flex gap-3 md:gap-10">
        <img
          src="/user.jpg"
          className="w-16 h-16 md:w-40 md:h-40 object-cover rounded-full"
          alt=""
        />
        <div className="flex-1 space-y-5">
          <div className="flex gap-5 md:flex-row flex-col">
            <h1 className="text-lg md:text-xl text-gray-500">Username</h1>
            <div className="md:flex gap-3 hidden">
              <Button>Edit profil</Button>
              <Button>Bagikan profil</Button>
              <button className="text-xl">
                <FaGear />
              </button>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <p className="text-sm">
              <strong>10 </strong>
              <span>kiriman</span>
            </p>
            <Link href={"/followers/username"} className="text-sm">
              <strong>100 </strong>
              <span>pengikut</span>
            </Link>
            <Link href={"/following/username"} className="text-sm">
              <strong>100 </strong>
              <span>diikuti</span>
            </Link>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Fullname</h3>
            <p className="text-sm">Bio</p>
          </div>
        </div>
      </div>
      <div className="flex md:hidden gap-3 justify-around">
        <Button className="flex-1">Edit profil</Button>
        <Button className="flex-1">Bagikan profil</Button>
      </div>
    </>
  );
};

export default UserProfileSection;
