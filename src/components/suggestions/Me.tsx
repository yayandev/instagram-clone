"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "./Skeleton";
const Me = () => {
  const { data: session, status }: any = useSession();
  if (status === "loading") return <Skeleton />;
  return (
    <div className="w-full flex justify-between gap-3 items-center">
      <Link
        href={`/u/${session?.user?.username}`}
        className="flex items-center gap-3 "
      >
        <Image
          src={`${session?.user?.image}`}
          width={50}
          height={50}
          alt="Profile"
          className="rounded-full"
        />
        <div>
          <h1 className="text-sm font-semibold">{session?.user?.username}</h1>
          <p className="text-xs">{session?.user?.name}</p>
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
