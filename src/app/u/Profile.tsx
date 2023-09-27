"use client";
import Spinner from "@/components/spinner/Spinner";
import { fetcher } from "@/utils/swr/fetcher";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGear, FaPencil } from "react-icons/fa6";
import useSWR from "swr";
import Skeleton from "./Skeleton";
import Media from "./Media";
import { useModalSettings } from "@/context/ModalSettingsContext";
import Verify from "@/components/verify/Verify";
import ClientOnly from "@/components/layout/ClientOnly";
import { useAuth } from "@/context/AuthContext";

const Profile = ({ username }: { username: string }) => {
  const { user, status }: any = useAuth();
  const router = useRouter();
  const { setIsOpen } = useModalSettings();
  const { error, data, isLoading, mutate } = useSWR(
    `/api/users/${username}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  const [isProccesFollow, setIsProccesFollow] = useState(false);
  if (status === "loading" || isLoading) return <Skeleton />;
  if (data.data === null)
    return (
      <h1 className="font-bold text-2xl text-center my-5">User not found</h1>
    );
  const url = `/u/${data?.data?.username}`;

  const handleFollow = async () => {
    setIsProccesFollow(true);
    const res = await axios.get(`/api/follow/${data.data?.id}`);
    if (res.data.success) {
      mutate();
    }
    setIsProccesFollow(false);
  };

  const handleUnFollow = async () => {
    setIsProccesFollow(true);
    const res = await axios.get(`/api/unfollow/${data.data?.id}`);
    if (res.data.success) {
      mutate();
    }
    setIsProccesFollow(false);
  };

  const SectionOption = () => {
    const isFollowing = data?.data?.followedByIDs.includes(user?.id);

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
            status === "authenticated"
              ? handleFollow()
              : router.push(`/login?callbackUrl=${url}`)
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
    <div>
      <div className="w-full flex gap-10 px-10 py-5">
        <Image
          src={data?.data?.image}
          width={150}
          height={150}
          alt="User"
          className="rounded-full md:w-[150px] md:h-[150px] w-[50px] h-[50px]"
        />
        <div>
          <div className="gap-5 items-center flex flex-wrap">
            <div>
              <h1 className="font-semibold text-lg flex gap-1 items-center">
                <span>{data?.data?.username}</span>
                {data?.data?.isVerify && <Verify />}
              </h1>
            </div>
            <ClientOnly>
              <div>
                {user?.id === data?.data?.id && (
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
                    <button
                      onClick={() => setIsOpen(true)}
                      className="font-bold text-lg"
                    >
                      <FaGear />
                    </button>
                  </div>
                )}
              </div>
            </ClientOnly>
          </div>
          <div>
            <ClientOnly>
              {data?.data?.id !== user?.id && <SectionOption />}
            </ClientOnly>
          </div>
          <div className="flex items-center gap-3 my-3">
            <Link href={"#"} className="font-semibold">
              {data?.data?._count.posts}{" "}
              <span className="text-sm text-slate-700">posts</span>
            </Link>
            <Link href={"#"} className="font-semibold">
              {data?.data?._count.followedBy}{" "}
              <span className="text-sm text-slate-700">followers</span>
            </Link>
            <Link href={"#"} className="font-semibold">
              {data?.data?._count.following}{" "}
              <span className="text-sm text-slate-700">following</span>
            </Link>
          </div>
          <div className="my-2">
            <h2 className="text-sm text-slate-500">{data?.data?.name}</h2>
          </div>
          <div className="w-full">
            <p>{data?.data?.bio}</p>
          </div>
        </div>
      </div>
      <Media userId={data?.data?.id} />
    </div>
  );
};

export default Profile;
