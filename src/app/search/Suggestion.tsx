"use client";

import Spinner from "@/components/spinner/Spinner";
import { useAuth } from "@/context/AuthContext";
import { fetcher } from "@/utils/swr/fetcher";
import useSWR from "swr";
import UserCard from "./UserCard";

const Suggestion = () => {
  const { user }: any = useAuth();
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

  return (
    <div className="my-5 w-full">
      <h1 className="font-bold">Suggestions</h1>
      <div className="w-full mt-5 flex flex-col gap-3">
        {data?.data?.map((user: any, index: number) => {
          return <UserCard key={index} data={user} />;
        })}
      </div>
    </div>
  );
};

export default Suggestion;
