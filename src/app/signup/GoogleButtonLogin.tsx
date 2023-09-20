"use client";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa6";

const GoogleButtonLogin = () => {
  return (
    <div className="p-3">
      <button
        onClick={() => signIn("google")}
        className="w-full p-1 rounded bg-[#0095f6] font-semibold text-white flex justify-center items-center gap-2 my-2"
      >
        <FaGoogle /> <span>Sign up with Google</span>
      </button>
    </div>
  );
};

export default GoogleButtonLogin;
