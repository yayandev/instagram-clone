"use client";
import Spinner from "@/components/spinner/Spinner";
import { fetcher } from "@/utils/swr/fetcher";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { BsArrow90DegLeft } from "react-icons/bs";
import useSWR from "swr";

const Form = () => {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [notif, setNotif] = useState("");
  const [isProccess, setisProccess] = useState(false);
  const [values, setValues] = useState({
    username: "",
  });
  const { data: session, status }: any = useSession();
  const { data, error, isLoading, mutate } = useSWR(
    `/api/users?id=${session?.user?.id}`,
    fetcher
  );
  if (error) return <div>Server Error!</div>;
  if (status === "loading" || isLoading) return <Spinner />;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setisProccess(true);
    const res = await axios.put("/api/change/username", {
      newUsername: values.username,
    });

    if (res.data.success) {
      //   router.refresh();
      mutate();
      setMsg(res.data.message);
      setNotif("text-green-600");
      setValues({
        username: "",
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
          <BsArrow90DegLeft /> <span>Change username</span>
        </Link>
      </div>

      <div className="flex gap-3 items-center">
        <Image
          src={data?.data?.image}
          width={70}
          height={70}
          className="rounded-full w-[70px] h-[70px]"
          alt="profile"
        />
        <div className="font-bold">{data?.data?.username}</div>
      </div>
      {msg && (
        <div className="my-2">
          <p className={"font-semibold text-sm " + notif}>{msg}</p>
        </div>
      )}

      <div className="my-2">
        <div>
          <label htmlFor="newusername" className="font-bold">
            New username
          </label>
        </div>
        <input
          type="text"
          id="newusername"
          required
          placeholder="Username minimal 4 characters"
          value={values.username}
          onChange={async (e) => {
            // rubah huruf menjadi kecil dan hapus space
            setValues({
              ...values,
              username: e.target.value.toLowerCase().trim(),
            });

            // validasi kata berbahaya
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
            } else {
              setNotif("text-green-600");
              setMsg("");
            }
          }}
          className="disabled:bg-slate-200 p-2 border w-full md:w-[250px]  focus:outline-none"
        />
      </div>

      <div className="my-2">
        <button
          disabled={isProccess}
          className="disabled:opacity-70 bg-sky-500 font-semibold text-white p-2 rounded"
        >
          {isProccess ? <Spinner /> : "Change username"}
        </button>
      </div>
    </form>
  );
};

export default Form;
