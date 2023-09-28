"use client";

import Spinner from "@/components/spinner/Spinner";
import Verify from "@/components/verify/Verify";
import { useAuth } from "@/context/AuthContext";
import { Follow } from "@/hooks/Follow";
import { unFollow } from "@/hooks/unFollow";
import { fetcher } from "@/utils/swr/fetcher";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

const Suggestion = () => {
  const { user }: any = useAuth();
  const [isProcces, setIsProcces] = useState(false);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/suggestions/${user?.id}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;

  if (isLoading) {
    return (
      <div className="w-full flex justify-center my-5">
        <Spinner />
      </div>
    );
  }

  if (data?.data?.length === 0) {
    return (
      <div className="w-full my-3">
        <h1 className="text-center text-sm font-semibold">No suggestions</h1>
      </div>
    );
  }

  const handelFollow = async (id: string) => {
    setIsProcces(true);
    const res = await Follow(id);
    if (res.success) {
      mutate();
    }
    setIsProcces(false);
  };

  const handelUnFollow = async (id: string) => {
    setIsProcces(true);
    const res = await unFollow(id);
    if (res.success) {
      mutate();
    }
    setIsProcces(false);
  };

  return (
    <div className="my-5 w-full">
      <h1 className="font-bold">Suggestions</h1>
      <div className="w-full mt-5 flex flex-col gap-3">
        {data?.data?.map((user: any, index: number) => {
          return (
            <div className="p-3 w-full flex gap-3" key={index}>
              <Link href={`/u/${user.id}`}>
                <Image
                  src={user.image}
                  alt="user profile"
                  width={100}
                  height={100}
                  className="rounded-full w-[100px] h-[100px]"
                />
              </Link>
              <div className="flex flex-col gap-1 items-start">
                <Link href={`/u/${user.id}`}>
                  <h1 className="font-semibold flex gap-1 items-center">
                    <span>{user.username}</span> {user.isVerify && <Verify />}
                  </h1>
                </Link>
                <h3 className="text-sm text-slate-500 ">{user.name}</h3>
                <button
                  disabled={isProcces}
                  onClick={() => handelFollow(user.id)}
                  className="px-3 text-sm text-white py-1 rounded bg-sky-500"
                >
                  {isProcces ? <Spinner /> : "Follow"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Suggestion;
