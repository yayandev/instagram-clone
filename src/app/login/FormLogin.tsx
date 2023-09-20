"use client";
import { signIn } from "next-auth/react";
import Spinner from "@/components/spinner/Spinner";
import { SyntheticEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa6";
import Link from "next/link";

const FormLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const url = searchParams.get("callbackUrl");

  const callbackUrl = url || "/";

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res: any = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (!res?.error) {
      router.push(callbackUrl);
    } else {
      setError("Email atau password salah");
      setIsLoading(false);
    }
  };
  return (
    <form className="w-full p-3" onSubmit={handleSubmit}>
      {Error && (
        <div className="w-full">
          <p className="text-red-500 text-sm text-center">{Error}</p>
        </div>
      )}
      <input
        type="text"
        required
        placeholder="Email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        className="w-full p-2 bg-[#fafafa] rounded-sm text-sm border mb-2"
      />
      <input
        type="password"
        required
        value={values.password}
        onChange={(e) => setValues({ ...values, password: e.target.value })}
        placeholder="Password"
        className="w-full p-2 bg-[#fafafa] rounded-sm text-sm border mb-2"
      />
      <button
        disabled={isLoading}
        type="submit"
        className="disabled:opacity-75 w-full p-1 rounded bg-[#4CB5F9] text-white text-center my-2 flex justify-center items-center"
      >
        {isLoading ? <Spinner /> : "Log in"}
      </button>
      <div className="w-full flex items-center justify-between my-2">
        <div className="w-[40%] h-[2px] bg-slate-200"></div>
        <div className="text-sm text-slate-500">OR</div>
        <div className="w-[40%] h-[2px] bg-slate-200"></div>
      </div>
      <div className="w-full flex justify-center items-center my-2">
        <button
          type="button"
          className="flex justify-center items-center gap-2 text-[#385185] text-sm font-semibold"
          onClick={() =>
            signIn("google", {
              redirect: false,
              callbackUrl: callbackUrl,
            })
          }
        >
          <FaGoogle /> <span>Log in with Google</span>
        </button>
      </div>
      <div className="w-full text-center my-2">
        <Link href={"#"} className="text-[#00376b] text-sm">
          Forgot password?
        </Link>
      </div>
    </form>
  );
};

export default FormLogin;
