"use client";

import Image from "next/image";
import Link from "next/link";
import Verify from "../verify/Verify";
import { useState } from "react";
import axios from "axios";
import Spinner from "../spinner/Spinner";

const UserCard = ({ user, mutate }: { user: any; mutate: any }) => {
  const [isFollow, setIsFollow] = useState(false);

  const handleFollow = async (id: string) => {
    setIsFollow(true);
    const res = await axios.get(`/api/follow/${id}`);

    if (res.data.success) {
      mutate();
    }
    setIsFollow(false);
  };
  return (
    <div className="w-full flex justify-between gap-3 items-center">
      <Link href={`/u/${user?.username}`} className="flex items-center gap-3 ">
        <Image
          src={user?.image}
          width={50}
          height={50}
          alt="Profile"
          className="rounded-full w-[50px] h-[50px]"
        />
        <div>
          <h1 className="text-sm font-semibold flex items-center gap-1">
            <span>{user?.username}</span>
            {user.isVerify && <Verify />}
          </h1>
          <p className="text-xs">{user?.name}</p>
        </div>
      </Link>
      <div className="">
        <button
          onClick={() => handleFollow(user?.id)}
          disabled={isFollow}
          className="disabled:opacity-50 text-sm text-blue-400 font-semibold"
        >
          {isFollow ? <Spinner /> : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
