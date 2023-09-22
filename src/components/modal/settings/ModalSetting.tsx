"use client";
import { useModalSettings } from "@/context/ModalSettingsContext";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ModalSetting = () => {
  const { isOpen, setIsOpen } = useModalSettings();
  const router = useRouter();
  return (
    <div
      className={
        isOpen
          ? "backdrop-brightness-75 fixed w-full h-full  top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center"
          : "hidden"
      }
    >
      <div className="bg-white w-[330px]  rounded shadow flex flex-col">
        <button
          onClick={() => {
            setIsOpen(false);
            router.push("/accounts/password/change");
          }}
          className="border-b-2 p-3 text-sm font-semibold"
        >
          Change password
        </button>
        <button
          onClick={() => {
            setIsOpen(false);
            router.push("/accounts/username/change");
          }}
          className="border-b-2 p-3 text-sm font-semibold"
        >
          Change username
        </button>
        <button className="border-b-2 p-3 text-sm font-semibold">
          Change email
        </button>
        <button className="border-b-2 p-3 text-sm font-semibold">
          Settings and privacy
        </button>
        <button
          onClick={() => signOut()}
          className="border-b-2 p-3 text-sm font-semibold text-red-500"
        >
          Log Out
        </button>
        <button
          className="border-b-2 p-3 text-sm font-semibold"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalSetting;
