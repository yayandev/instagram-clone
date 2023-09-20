import { useModalComments } from "@/context/ModalCommentsContext";
import Image from "next/image";
import React from "react";
import { BsChat, BsDot, BsHeart, BsX } from "react-icons/bs";

const ModalComments = () => {
  const { isOpenModalComments, setIsOpenModalComments } = useModalComments();
  return (
    <div
      className={
        isOpenModalComments
          ? "backdrop-brightness-75 fixed w-full h-full  top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center"
          : "hidden"
      }
    >
      <div className="md:w-[80%] w-[90%] h-[80vh] bg-white flex gap-5">
        <Image
          src={"/post.png"}
          width={300}
          height={300}
          alt="post"
          className="w-[50%] md:block hidden"
        />
        <div className="w-full md:w-[50%] h-full p-5">
          <div className="w-full flex justify-between items-center py-2">
            <h1 className="md:hidden block font-bold text-xl">Comments</h1>
            <div className="md:flex hidden gap-3 items-center">
              <Image
                src={"/user.jpg"}
                width={50}
                height={50}
                className="rounded-full"
                alt="Profile"
              />
              <h1 className="font-semibold text-sm">yanz20.ig</h1>
            </div>
            <button
              className="font-bold text-3xl"
              onClick={() => setIsOpenModalComments(false)}
            >
              <BsX />
            </button>
          </div>
          <div className="w-full md:flex hidden my-2 gap-3">
            <div className="text-sm font-semibold flex gap-2 items-center">
              <span>
                <BsChat />
              </span>
              <span>10 Comments</span>
            </div>
            <div className="text-sm font-semibold flex gap-2 items-center">
              <span>
                <BsHeart />
              </span>
              <span>10 Likes</span>
            </div>
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full border-b-2 focus:outline-none"
            />
          </div>
          <div className="overflow-hidden w-full h-[500px] md:h-[370px]">
            <div className="w-full overflow-y-scroll h-[500px] md:h-[370px]">
              <div className="w-full p-3">
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={"/user.jpg"}
                      width={30}
                      height={30}
                      className="rounded-full"
                      alt="Profile"
                    />
                    <h1 className="font-semibold text-sm flex gap-1 items-center">
                      <span className="text-sm text-slate-400">3d</span>
                      <span className="text-sm text-slate-400">
                        <BsDot />
                      </span>
                      yanz20.ig
                    </h1>
                  </div>
                  <button className="font-bold text-xl">
                    <BsHeart />
                  </button>
                </div>
                <div className="my-2">
                  <p className="text-sm">Hello World..</p>
                </div>
              </div>
              <div className="w-full p-3">
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={"/user.jpg"}
                      width={30}
                      height={30}
                      className="rounded-full"
                      alt="Profile"
                    />
                    <h1 className="font-semibold text-sm flex gap-1 items-center">
                      <span className="text-sm text-slate-400">3d</span>
                      <span className="text-sm text-slate-400">
                        <BsDot />
                      </span>
                      yanz20.ig
                    </h1>
                  </div>
                  <button className="font-bold text-xl">
                    <BsHeart />
                  </button>
                </div>
                <div className="my-2">
                  <p className="text-sm">Hello World..</p>
                </div>
              </div>
              <div className="w-full p-3">
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={"/user.jpg"}
                      width={30}
                      height={30}
                      className="rounded-full"
                      alt="Profile"
                    />
                    <h1 className="font-semibold text-sm flex gap-1 items-center">
                      <span className="text-sm text-slate-400">3d</span>
                      <span className="text-sm text-slate-400">
                        <BsDot />
                      </span>
                      yanz20.ig
                    </h1>
                  </div>
                  <button className="font-bold text-xl">
                    <BsHeart />
                  </button>
                </div>
                <div className="my-2">
                  <p className="text-sm">Hello World..</p>
                </div>
              </div>
              <div className="w-full p-3">
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={"/user.jpg"}
                      width={30}
                      height={30}
                      className="rounded-full"
                      alt="Profile"
                    />
                    <h1 className="font-semibold text-sm flex gap-1 items-center">
                      <span className="text-sm text-slate-400">3d</span>
                      <span className="text-sm text-slate-400">
                        <BsDot />
                      </span>
                      yanz20.ig
                    </h1>
                  </div>
                  <button className="font-bold text-xl">
                    <BsHeart />
                  </button>
                </div>
                <div className="my-2">
                  <p className="text-sm">Hello World..</p>
                </div>
              </div>
              <div className="w-full p-3">
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={"/user.jpg"}
                      width={30}
                      height={30}
                      className="rounded-full"
                      alt="Profile"
                    />
                    <h1 className="font-semibold text-sm flex gap-1 items-center">
                      <span className="text-sm text-slate-400">3d</span>
                      <span className="text-sm text-slate-400">
                        <BsDot />
                      </span>
                      yanz20.ig
                    </h1>
                  </div>
                  <button className="font-bold text-xl">
                    <BsHeart />
                  </button>
                </div>
                <div className="my-2">
                  <p className="text-sm">Hello World..</p>
                </div>
              </div>
              <div className="w-full p-3">
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={"/user.jpg"}
                      width={30}
                      height={30}
                      className="rounded-full"
                      alt="Profile"
                    />
                    <h1 className="font-semibold text-sm flex gap-1 items-center">
                      <span className="text-sm text-slate-400">3d</span>
                      <span className="text-sm text-slate-400">
                        <BsDot />
                      </span>
                      yanz20.ig
                    </h1>
                  </div>
                  <button className="font-bold text-xl">
                    <BsHeart />
                  </button>
                </div>
                <div className="my-2">
                  <p className="text-sm">Hello World..</p>
                </div>
              </div>
              <div className="w-full p-3">
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={"/user.jpg"}
                      width={30}
                      height={30}
                      className="rounded-full"
                      alt="Profile"
                    />
                    <h1 className="font-semibold text-sm flex gap-1 items-center">
                      <span className="text-sm text-slate-400">3d</span>
                      <span className="text-sm text-slate-400">
                        <BsDot />
                      </span>
                      yanz20.ig
                    </h1>
                  </div>
                  <button className="font-bold text-xl">
                    <BsHeart />
                  </button>
                </div>
                <div className="my-2">
                  <p className="text-sm">Hello World..</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComments;
