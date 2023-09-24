"use client";
import Spinner from "@/components/spinner/Spinner";
import { useAuth } from "@/context/AuthContext";
import { fetcher } from "@/utils/swr/fetcher";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { BsArrow90DegLeft } from "react-icons/bs";

const Form = () => {
  const [msg, setMsg] = useState("");
  const [notif, setNotif] = useState("");
  const [isProccess, setisProccess] = useState(false);
  const [values, setValues] = useState({
    oldpassword: "",
    newpassword: "",
    confirm: "",
  });

  const { user, status, loading, represh }: any = useAuth();
  if (status === "loading" || loading) return <Spinner />;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setisProccess(true);
    const res = await axios.put("/api/change/password", {
      password: values.oldpassword,
      newPassword: values.newpassword,
      confirmNewPassword: values.confirm,
    });

    if (res.data.success) {
      represh();
      setMsg(res.data.message);
      setNotif("text-green-600");
      setValues({
        oldpassword: "",
        newpassword: "",
        confirm: "",
      });
    } else {
      setMsg(res.data.message);
      setNotif("text-red-600");
    }
    setisProccess(false);
  };

  return (
    <form className="w-full md:px-10 px-3" onSubmit={handleSubmit}>
      <div className="my-2">
        <Link
          href={"/"}
          className="font-semibold text-xl flex gap-2 items-center"
        >
          <BsArrow90DegLeft /> <span>Change password</span>
        </Link>
      </div>

      <div className="flex gap-3 items-center">
        <Image
          src={user?.image}
          width={70}
          height={70}
          className="rounded-full w-[70px] h-[70px]"
          alt="profile"
        />
        <div className="font-bold">{user?.username}</div>
      </div>
      {msg && (
        <div className="my-2">
          <p className={"font-semibold text-sm " + notif}>{msg}</p>
        </div>
      )}
      <div className="my-2">
        <div>
          <label htmlFor="oldpassword" className="font-bold">
            Old password
          </label>
        </div>
        <input
          type="password"
          id="oldpassword"
          required
          value={values.oldpassword}
          onChange={(e) =>
            setValues({ ...values, oldpassword: e.target.value })
          }
          className="disabled:bg-slate-200 p-2 border w-full md:w-[250px]  focus:outline-none"
        />
      </div>
      <div className="my-2">
        <div>
          <label htmlFor="newpassword" className="font-bold">
            New password
          </label>
        </div>
        <input
          type="password"
          id="newpassword"
          required
          value={values.newpassword}
          onChange={(e) =>
            setValues({ ...values, newpassword: e.target.value })
          }
          className="disabled:bg-slate-200 p-2 border w-full md:w-[250px]  focus:outline-none"
        />
      </div>
      <div className="my-2">
        <div>
          <label htmlFor="confirm" className="font-bold">
            Confirm new password
          </label>
        </div>
        <input
          type="password"
          id="confirm"
          required
          value={values.confirm}
          onChange={(e) => setValues({ ...values, confirm: e.target.value })}
          className="p-2 border w-full md:w-[250px]  focus:outline-none"
        />
      </div>
      <div className="my-2">
        <Link
          href={"/accounts/password/reset"}
          className="font-semibold text-sm text-sky-500"
        >
          Forgot password?
        </Link>
      </div>
      <div className="my-2">
        <button
          disabled={isProccess}
          className="disabled:opacity-70 bg-sky-500 font-semibold text-white p-2 rounded"
        >
          {isProccess ? <Spinner /> : "Change password"}
        </button>
      </div>
    </form>
  );
};

export default Form;
