"use client";
import Spinner from "@/components/spinner/Spinner";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGear, FaPencil } from "react-icons/fa6";

const Profile = ({ userProfile }: any) => {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const [isProccesFollow, setIsProccesFollow] = useState(false);
  if (status === "loading") return <Spinner />;
  const url = `/u/${userProfile.username}`;

  // handle Follow
  const handleFollow = async () => {
    setIsProccesFollow(true);
    const res = await axios.get(`/api/follow/${userProfile.id}`);
    if (res.data.success) {
      // setFollowing(true);
      router.refresh();
    }
    setIsProccesFollow(false);
  };

  const handleUnFollow = async () => {
    setIsProccesFollow(true);
    const res = await axios.get(`/api/unfollow/${userProfile.id}`);
    if (res.data.success) {
      // setFollowing(true);
      router.refresh();
    }
    setIsProccesFollow(false);
  };

  const SectionOption = () => {
    const isFollowing = userProfile?.followedByIDs.includes(session?.user?.id);

    if (isFollowing) {
      return (
        <div className="w-full my-2">
          <button
            onClick={handleUnFollow}
            disabled={isProccesFollow}
            className="disabled:opacity-70 px-5 py-1 bg-sky-500 text-white text-sm rounded"
          >
            {isProccesFollow ? <Spinner /> : "Unfollow"}
          </button>
        </div>
      );
    }

    return (
      <div className="w-full my-2">
        <button
          onClick={() =>
            session ? handleFollow() : router.push(`/login?callbackUrl=${url}`)
          }
          disabled={isProccesFollow}
          className="disabled:opacity-70 px-5 py-1 bg-sky-500 text-white text-sm rounded"
        >
          {isProccesFollow ? <Spinner /> : "Follow"}
        </button>
      </div>
    );
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
          </div>
          {session && (
            <div>
              {session.user?.email === userProfile.email && (
                <div className="flex gap-3">
                  <Link
                    href={"/accounts/edit"}
                    className="p-2 rounded flex gap-2 items-center bg-slate-200 text-sm font-semibold hover:opacity-75"
                  >
                    <div className="">
                      <FaPencil />
                    </div>
                    <div className="md:block hidden">Edit profile</div>
                  </Link>
                  <button className="font-bold text-lg">
                    <FaGear />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          {userProfile?.email !== session?.user.email && <SectionOption />}
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
        <div className="my-2">
          <h2 className="text-sm text-slate-500">{userProfile.name}</h2>
        </div>
        <div className="w-full">
          <p>{userProfile.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
