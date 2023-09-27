"use client";
import { fetcher } from "@/utils/swr/fetcher";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import Skeleton from "./Skeleton";
import axios from "axios";
import Verify from "../verify/Verify";
import { useAuth } from "@/context/AuthContext";
const SuggestionList = () => {
  const [isFollow, setIsFollow] = useState(false);
  const { user, status }: any = useAuth();
  const { data, error, isLoading, mutate } = useSWR(
    `/api/suggestions/${user?.id}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;

  const handleFollow = async (id: string) => {
    setIsFollow(true);
    const res = await axios.get(`/api/follow/${id}`);

    if (res.data.success) {
      mutate();
    }
    setIsFollow(false);
  };
  return (
    <div className="w-full mt-5">
      <div className="flex justify-between">
        <h2 className="text-sm font-semibold text-slate-500">
          Suggested for you
        </h2>
        <button className="font-semibold text-sm">See All</button>
      </div>

      {isLoading || status === "loading" ? (
        <div className="flex w-full flex-col gap-3 my-3">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div>
          {data?.data === undefined ? (
            <div className="w-full my-3">
              <h1 className="text-center text-sm font-semibold">
                No suggestions
              </h1>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-3 my-3">
              {data?.data &&
                data?.data.map((user: any, index: number) => (
                  <div
                    className="w-full flex justify-between gap-3 items-center"
                    key={index}
                  >
                    <Link
                      href={`/u/${user?.username}`}
                      className="flex items-center gap-3 "
                    >
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
                        Follow
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestionList;
