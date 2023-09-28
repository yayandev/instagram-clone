"use client";

import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import UserCard from "./UserCard";
import Spinner from "@/components/spinner/Spinner";

const Form = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notif, setNotif] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setNotif("");

    const res = await axios.post("/api/search", {
      type: "users",
      keyword: search,
    });

    if (res.data.success) {
      setData(res.data.users);
    }

    if (res.data.users.length === 0) {
      setNotif("No results");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-between items-center my-3 border-2 rounded px-3"
      >
        <input
          type="text"
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={() => setNotif("")}
          placeholder="Search account..."
          className="p-3 focus:outline-none w-[90%]"
        />
        {isLoading ? (
          <Spinner />
        ) : (
          <button type="submit">
            <BsSearch />
          </button>
        )}
      </form>
      {notif && (
        <div className="w-full mt-5">
          <h1 className="text-center font-bold">{notif}</h1>
        </div>
      )}

      {data && (
        <div className="w-full mt-3">
          {data.map((user: any, index: number) => (
            <UserCard data={user} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Form;
