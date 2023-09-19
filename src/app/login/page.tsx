import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Instagram - Login",
};

import { FaFacebook } from "react-icons/fa6";

const PageLogin = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-3">
      <div className="sm:w-[350px] px-4 pt-4 sm:border w-full">
        <div className="w-full flex justify-center">
          <Image src={"/logo-nobg.png"} width={200} height={100} alt="logo" />
        </div>
        <form className="w-full p-3">
          <input
            type="text"
            placeholder="Phone number, username, or email"
            className="w-full p-2 bg-[#fafafa] rounded-sm text-sm border mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 bg-[#fafafa] rounded-sm text-sm border mb-2"
          />
          <button className="w-full p-1 rounded bg-[#4CB5F9] text-white text-center my-2">
            Log in
          </button>
          <div className="w-full flex items-center justify-between my-2">
            <div className="w-[40%] h-[2px] bg-slate-200"></div>
            <div className="text-sm text-slate-500">OR</div>
            <div className="w-[40%] h-[2px] bg-slate-200"></div>
          </div>
          <div className="w-full flex justify-center items-center my-2">
            <button className="flex justify-center items-center gap-2 text-[#385185] text-sm font-semibold">
              <FaFacebook /> <span>Log in with Facebook</span>
            </button>
          </div>
          <div className="w-full text-center my-2">
            <Link href={"#"} className="text-[#00376b] text-sm">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
      <div className="sm:w-[350px] p-4 sm:border w-full text-center">
        <span className="text-sm">
          Don't have an account?{" "}
          <Link href={"/signup"} className="text-[#0095f6]">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PageLogin;
