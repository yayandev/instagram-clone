"use client";
import Verify from "@/components/verify/Verify";
import { useModalPostOptions } from "@/context/ModalPostOptionsContext";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";

const Header = ({ data }: any) => {
  const { setIsOpen, setPostId, setAuthor } = useModalPostOptions();

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
            <h1 className="font-semibold flex items-center gap-1">
              <span>{data.user.username} </span>
              {data.user.isVerify && <Verify />}
            </h1>
            <p className="text-sm">{data.user.name}</p>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              setAuthor(data?.user);
              setPostId(data?.id);
              setIsOpen(true);
            }}
          >
            <BsThreeDots />
          </button>
        </div>
      </div>
      <div className="w-full my-3">
        <p className="text-xs">{data.caption}</p>
      </div>
    </div>
  );
};

export default Header;
