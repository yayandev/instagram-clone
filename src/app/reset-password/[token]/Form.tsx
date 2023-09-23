"use client";
import Spinner from "@/components/spinner/Spinner";
import axios from "axios";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { BsArrow90DegLeft } from "react-icons/bs";

const Form = ({ token }: { token: string }) => {
  const [msg, setMsg] = useState("");
  const [notif, setNotif] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    newpassword: "",
    confirm: "",
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await axios.put(`/api/change/password2`, {
      newPassword: values.newpassword,
      confirmNewPassword: values.confirm,
      token: token,
    });

    if (res.data.success) {
      setMsg(res.data.message);
      setNotif("text-green-600");
      setValues({
        newpassword: "",
        confirm: "",
      });
    } else {
      setMsg(res.data.message);
      setNotif("text-red-600");
    }
    setIsLoading(false);
  };

  return (
    <form className="w-full md:px-10 px-3" onSubmit={handleSubmit}>
      <div className="my-2">
        <Link
          href={"/login"}
          className="font-semibold text-xl flex gap-2 items-center"
        >
          <BsArrow90DegLeft /> <span>Change password</span>
        </Link>
      </div>

      {msg && (
        <div className="my-2">
          <p className={"font-semibold text-sm " + notif}>{msg}</p>
        </div>
      )}

      <div className="my-2">
        <div>
          <label htmlFor="newpassword" className="font-semibold">
            New password
          </label>
        </div>
        <input
          value={values.newpassword}
          onChange={(e) =>
            setValues({ ...values, newpassword: e.target.value })
          }
          type="password"
          id="newpassword"
          required
          className="disabled:bg-slate-200 p-2 border w-full md:w-[250px]  focus:outline-none"
        />
      </div>
      <div className="my-2">
        <div>
          <label htmlFor="confirm" className="font-semibold">
            Confirm new password
          </label>
        </div>
        <input
          type="password"
          id="confirm"
          value={values.confirm}
          onChange={(e) => setValues({ ...values, confirm: e.target.value })}
          required
          className="disabled:bg-slate-200 p-2 border w-full md:w-[250px]  focus:outline-none"
        />
      </div>
      <div className="my-2">
        <button
          disabled={isLoading}
          className="disabled:opacity-70 bg-sky-500 font-semibold text-white p-2 rounded"
        >
          {isLoading ? <Spinner /> : "Change password"}
        </button>
      </div>
    </form>
  );
};

export default Form;
