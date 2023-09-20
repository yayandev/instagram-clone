"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGear, FaPencil } from "react-icons/fa6";

const Profile = ({ userProfile }: any) => {
  const { data: session, status }: any = useSession();
  const [following, setFollowing] = useState(false);
  const [follower, setFollower] = useState(false);
  const [isProccesFollow, setIsProccesFollow] = useState(false);
  if (status === "loading") return <div>loading</div>;

  // handle Follow
  const handleFollow = async () => {
    setIsProccesFollow(true);
    const res = await axios.get(`/api/follow/${userProfile.id}`);
    if (res.data.success) {
      // setFollowing(true);
      setFollower(true);
    }
    setIsProccesFollow(false);
  };

  return (
    <div className="w-full flex gap-10 px-10 py-5">
      <Image
        src={userProfile.image}
        width={150}
        height={150}
        alt="User"
        className="rounded-full md:w-[150px] md:h-[150px] w-[65px] h-[65px]"
      />
      <div>
        <div className="gap-5 items-center flex">
          <div>
            <h1 className="font-semibold text-lg">{userProfile.username}</h1>
            <h2 className="text-sm text-slate-500">{userProfile.name}</h2>
          </div>
          {session.user?.email === userProfile.email && (
            <div className="md:flex hidden">
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
          )}
        </div>
        <div className="flex items-center gap-3 my-3">
          <Link href={"#"} className="font-semibold">
            6 <span className="text-sm text-slate-700">posts</span>
          </Link>
          <Link href={"#"} className="font-semibold">
            {userProfile._count.followedBy}{" "}
            <span className="text-sm text-slate-700">followers</span>
          </Link>
          <Link href={"#"} className="font-semibold">
            {userProfile._count.following}{" "}
            <span className="text-sm text-slate-700">following</span>
          </Link>
        </div>
        <div className="w-full">{/* <p>No Bio Nyet!</p> */}</div>
      </div>
    </div>
  );
};

export default Profile;
