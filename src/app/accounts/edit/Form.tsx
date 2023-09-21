"use client";
import Spinner from "@/components/spinner/Spinner";
import axios from "axios";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import { FaPencil } from "react-icons/fa6";
const Form = ({ data }: any) => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [msg, setMsg] = useState("");
  const [values, setValues] = useState({
    bio: data.data.bio,
    username: data.data.username,
    email: data.data.email,
    name: data.data.name,
    image: data.data.image,
    idImage: data.data.idImage,
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoadingUpdate(true);

    const res = await axios.put("/api/users", {
      name: values.name,
      username: values.username,
      email: values.email,
      bio: values.bio,
    });

    if (res.data.success) {
      setMsg(res.data.message);
    } else {
      setMsg(res.data.message);
    }

    setIsLoadingUpdate(false);
  };

  return (
    <form className="w-full md:px-10 px-3" onSubmit={handleSubmit}>
      <div className="my-2">
        <h1 className="font-bold text-xl">Edit profile</h1>
      </div>
      {msg && (
        <div className="my-2">
          <p className="font-semibold text-sm text-green-600">{msg}</p>
        </div>
      )}
      <div className="flex gap-3 items-center">
        <Image
          src={values.image}
          width={70}
          height={70}
          className="rounded-full"
          alt="profile"
        />
        <button
          type="button"
          className="font-semibold text-sm text-blue-500 flex gap-2 items-center"
        >
          <FaPencil />
          <span>Change photo</span>
        </button>
      </div>
      <div className="my-2">
        <div>
          <label htmlFor="bio" className="font-bold">
            Bio
          </label>
        </div>
        <textarea
          id="bio"
          value={values.bio}
          onChange={(e) => setValues({ ...values, bio: e.target.value })}
          className="p-3 border w-full md:w-[250px] h-[100px] focus:outline-none"
        ></textarea>
      </div>
      <div className="my-2">
        <div>
          <label htmlFor="username" className="font-bold">
            username
          </label>
        </div>
        <input
          type="text"
          id="username"
          value={values.username}
          onChange={(e) => setValues({ ...values, username: e.target.value })}
          className="p-2 border w-full md:w-[250px]  focus:outline-none"
        />
      </div>
      <div className="my-2">
        <div>
          <label htmlFor="email" className="font-bold">
            email
          </label>
        </div>
        <input
          type="email"
          disabled
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          id="email"
          className="disabled:bg-slate-200 p-2 border w-full md:w-[250px]  focus:outline-none"
        />
      </div>
      <div className="my-2">
        <div>
          <label htmlFor="name" className="font-bold">
            name
          </label>
        </div>
        <input
          type="text"
          id="name"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          className="p-2 border w-full md:w-[250px]  focus:outline-none"
        />
      </div>
      <div className="my-2">
        <button
          disabled={isLoadingUpdate}
          className="bg-sky-500 font-semibold text-white p-2 rounded"
        >
          {isLoadingUpdate ? <Spinner /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Form;
