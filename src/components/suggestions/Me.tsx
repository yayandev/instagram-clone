"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "./Skeleton";
import { fetcher } from "@/utils/swr/fetcher";
import useSWR from "swr";
import Verify from "../verify/Verify";
const Me = () => {
  const { data: session, status }: any = useSession();
  const { data, error, isLoading } = useSWR(
    "/api/users?email=" + session?.user?.email,
    fetcher
  );
  if (status === "loading" || isLoading) return <Skeleton />;
  if (error) return <div>failed to load</div>;
  return (
    <div className="w-full flex justify-between gap-3 items-center">
      <Link
        href={`/u/${data?.data?.username}`}
        className="flex items-center gap-3 "
      >
        <Image
          src={`${data?.data?.image}`}
          width={50}
          height={50}
          alt="Profile"
          className="rounded-full w-[50px] h-[50px]"
        />
        <div>
          <h1 className="text-sm font-semibold flex items-center gap-1">
            <span>{data?.data?.username}</span>
            {data?.data?.isVerify && <Verify />}
          </h1>
          <p className="text-xs">{data?.data?.name}</p>
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
