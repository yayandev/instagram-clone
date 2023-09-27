"use client";
import ClientOnly from "@/components/layout/ClientOnly";
import Verify from "@/components/verify/Verify";
import { useModalPostOptions } from "@/context/ModalPostOptionsContext";
import { formatRelativeTime } from "@/helpers/formatRelativeTime";
import Image from "next/image";
import { BsDot, BsThreeDots } from "react-icons/bs";

const Header = ({ data }: any) => {
  const { setIsOpen, setPostId, setAuthor } = useModalPostOptions();
  let date = new Date(data?.createdAt);
  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div className="w-full flex gap-3">
          <Image
            src={data?.user?.image}
            alt={data?.user?.username}
            width={50}
            height={50}
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="">
            <h1 className="font-semibold flex items-center gap-3">
              <div>{data.user.username} </div>
              {data.user.isVerify && <Verify />}
              <div>
                <BsDot />
              </div>
              <div className="text-sm text-slate-500">
                {formatRelativeTime(date)}
              </div>
            </h1>
            <p className="text-sm">{data.user.name}</p>
          </div>
        </div>
        <div>
          <ClientOnly>
            <button
              onClick={() => {
                setAuthor(data?.user);
                setPostId(data?.id);
                setIsOpen(true);
              }}
            >
              <BsThreeDots />
            </button>
          </ClientOnly>
        </div>
      </div>
      <div className="w-full my-3">
        <p className="text-xs">{data.caption}</p>
      </div>
    </div>
  );
};

export default Header;
