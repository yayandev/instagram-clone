import Spinner from "@/components/spinner/Spinner";
import Verify from "@/components/verify/Verify";
import { useAuth } from "@/context/AuthContext";
import { Follow } from "@/hooks/Follow";
import { unFollow } from "@/hooks/unFollow";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserCard = ({ data }: any) => {
  const { user }: any = useAuth();
  const [isProcces, setIsProcces] = useState(false);
  const router = useRouter();
  const handelFollow = async () => {
    setIsProcces(true);
    const res = await Follow(data.id);
    if (res.success) {
      router.push(`/u/${data.username}`);
    }
    setIsProcces(false);
  };

  const handelUnFollow = async () => {
    setIsProcces(true);
    const res = await unFollow(data.id);
    if (res.success) {
      router.push(`/u/${data.username}`);
    }
    setIsProcces(false);
  };
  return (
    <div className="w-full">
      <div className="p-3 w-full flex gap-3">
        <Link href={`/u/${data?.id}`}>
          <Image
            src={data?.image}
            alt="data profile"
            width={100}
            height={100}
            className="rounded-full w-[100px] h-[100px]"
          />
        </Link>
        <div className="flex flex-col gap-1 items-start">
          <Link href={`/u/${data?.id}`}>
            <h1 className="font-semibold flex gap-1 items-center">
              <span>{data?.username}</span> {data?.isVerify && <Verify />}
            </h1>
          </Link>
          <h3 className="text-sm text-slate-500">{data?.name}</h3>
          {data?.id !== user?.id ? (
            <div className="w-full">
              {data?.followedByIDs.includes(user.id) ? (
                <button
                  disabled={isProcces}
                  onClick={handelUnFollow}
                  className="px-3 text-sm text-white py-1 rounded bg-sky-500"
                >
                  {isProcces ? <Spinner /> : "Unfollow"}
                </button>
              ) : (
                <button
                  disabled={isProcces}
                  onClick={handelFollow}
                  className="px-3 text-sm text-white py-1 rounded bg-sky-500"
                >
                  {isProcces ? <Spinner /> : "Follow"}
                </button>
              )}
            </div>
          ) : (
            <Link
              href={`/u/${data?.id}`}
              className="px-3 text-sm text-white py-1 rounded bg-sky-500"
            >
              Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
