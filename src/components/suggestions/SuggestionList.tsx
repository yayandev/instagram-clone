"use client";
import { fetcher } from "@/utils/swr/fetcher";
import React from "react";
import useSWR from "swr";
import Skeleton from "./Skeleton";
import { useAuth } from "@/context/AuthContext";
import UserCard from "./UserCard";
const SuggestionList = () => {
  const { user, status }: any = useAuth();
  const { data, error, isLoading, mutate } = useSWR(
    `/api/suggestions/${user?.id}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;

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
                  <UserCard user={user} key={index} mutate={mutate} />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestionList;
