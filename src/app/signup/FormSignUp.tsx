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
  const [checkUsername, setCheckUsername] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notif, setNotif] = useState("");
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
      setNotif("text-red-600");
      setIsLoading(false);
    }
  };
  return (
    <form className="w-full p-3" onSubmit={handleSubmit}>
      {msg && (
        <div className="w-full my-2">
          <p className={"text-sm text-center " + notif}>{msg}</p>
        </div>
      )}
      {checkUsername && (
        <div className="w-full my-2 flex justify-center h-[30px]">
          <div className="spinner h-[30px] w-[30px]"></div>
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
        onChange={async (e) => {
          setCheckUsername(true);
          setValues({
            ...values,
            username: e.target.value.toLowerCase().trim(),
          });

          let toxic: any = [];
          const res = await axios.get("/kata-kasar.json");
          toxic = res.data;

          // munculkan msg ketika menekan space
          if (e.target.value.includes(" ")) {
            setNotif("text-red-600");
            setMsg("username tidak boleh mengandung spasi!");
          } else if (e.target.value.length < 4) {
            setNotif("text-red-600");
            setMsg("username minimal 4 karakter!");
          } else if (toxic.includes(e.target.value.toLowerCase().trim())) {
            setNotif("text-red-600");
            setMsg("username tidak boleh mengandung kata-kata berbahaya!");
          } else if (e.target.value.length > 20) {
            setNotif("text-red-600");
            setMsg("username maksimal 15 karakter!");
          } else {
            setNotif("");
            setMsg("");
          }
          setCheckUsername(false);
        }}
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
