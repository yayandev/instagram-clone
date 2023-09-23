"use client";
import axios from "axios";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { BsArrow90DegLeft } from "react-icons/bs";

const Form = () => {
  const [msg, setMsg] = useState("");
  const [notif, setNotif] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await axios.post("/api/reset/password", {
      email: values.email,
    });

    if (res.data.success) {
      setMsg(res.data.message);
      setNotif("text-green-600");
      setValues({
        email: "",
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
          <BsArrow90DegLeft /> <span>Reset password</span>
        </Link>
      </div>

      {msg && (
        <div className="my-2">
          <p className={"font-semibold text-sm " + notif}>{msg}</p>
        </div>
      )}

      <div className="my-2">
        <div>
          <label htmlFor="email" className="text-sm text-slate-400">
            Enter your email for reset password, we will send link change
            password to your email!
          </label>
        </div>
        <input
          type="email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          id="email"
          required
          className="disabled:bg-slate-200 p-2 border w-full md:w-[250px]  focus:outline-none"
        />
      </div>

      <div className="my-2">
        <button
          disabled={isLoading}
          className="disabled:opacity-70 bg-sky-500 font-semibold text-white p-2 rounded"
        >
          {isLoading ? "Sending..." : "Send link"}
        </button>
      </div>
    </form>
  );
};

export default Form;
