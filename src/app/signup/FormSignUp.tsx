"use client";
import { SyntheticEvent, useState } from "react";
import Information from "./Information";
import Spinner from "@/components/spinner/Spinner";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormSignUp = () => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await axios.post("/api/auth/signup", values);
    if (res.data.success) {
      router.push("/login");
    } else {
      setMsg(res.data.message);
      setIsLoading(false);
    }
  };
  return (
    <form className="w-full p-3" onSubmit={handleSubmit}>
      {msg && (
        <div className="w-full my-2">
          <p className="text-red-500 text-sm text-center">{msg}</p>
        </div>
      )}
      <input
        type="email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        required
        placeholder="Email"
        className="w-full p-2 bg-[#fafafa] rounded-sm text-sm border mb-2 focus:outline-none"
      />
      <input
        type="text"
        value={values.name}
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        required
        placeholder="Full name"
        className="w-full p-2 bg-[#fafafa] rounded-sm text-sm border mb-2 focus:outline-none"
      />
      <input
        type="text"
        value={values.username}
        onChange={(e) => setValues({ ...values, username: e.target.value })}
        required
        placeholder="Username"
        className="w-full p-2 bg-[#fafafa] rounded-sm text-sm border mb-2 focus:outline-none"
      />
      <input
        type="password"
        value={values.password}
        onChange={(e) => setValues({ ...values, password: e.target.value })}
        required
        placeholder="Password"
        className="w-full p-2 bg-[#fafafa] rounded-sm text-sm border mb-2 focus:outline-none"
      />
      <Information />
      <button
        disabled={isLoading}
        type="submit"
        className="w-full p-1 rounded bg-[#4CB5F9] text-white text-center my-2 disabled:opacity-75 flex justify-center items-center"
      >
        {isLoading ? <Spinner /> : "Sign up"}
      </button>
    </form>
  );
};

export default FormSignUp;
