"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "./Skeleton";
import Verify from "../verify/Verify";
import { useAuth } from "@/context/AuthContext";
const Me = () => {
  const { user, status, loading }: any = useAuth();
  if (status === "loading" || loading) return <Skeleton />;
  return (
    <div className="w-full flex justify-between gap-3 items-center">
      <Link href={`/u/${user?.username}`} className="flex items-center gap-3 ">
        <Image
          src={`${user?.image}`}
          width={50}
          height={50}
          alt="Profile"
          className="rounded-full w-[50px] h-[50px]"
        />
        <div>
          <h1 className="text-sm font-semibold flex items-center gap-1">
            <span>{user?.username}</span>
            {user?.isVerify && <Verify />}
          </h1>
          <p className="text-xs">{user?.name}</p>
        </div>
      </Link>
      <div className="">
        <button
          className="text-sm text-red-400 font-semibold"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Me;
