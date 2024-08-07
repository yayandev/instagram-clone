"use client";
import { FaBookmark, FaUser } from "react-icons/fa";
import { BsGrid, BsFillGridFill } from "react-icons/bs";
import { useState } from "react";

const TabsSection = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="py-3 flex justify-around md:justify-center gap-5 border-t-2 border-gray-200">
      <button
        onClick={() => setActive(0)}
        className={`flex gap-2 items-center text-2xl md:text-sm font-semibold ${
          active === 0 ? "text-black" : "text-gray-400 "
        }`}
      >
        {active === 0 ? <BsFillGridFill /> : <BsGrid />}
        <span className="hidden md:block">POSTINGAN</span>
      </button>
      <button
        onClick={() => setActive(1)}
        className={`flex gap-2 items-center text-2xl md:text-sm font-semibold ${
          active === 1 ? "text-black" : "text-gray-400 "
        }`}
      >
        <FaBookmark />
        <span className="hidden md:block">TERSIMPAN</span>
      </button>
      <button
        onClick={() => setActive(2)}
        className={`flex gap-2 items-center text-2xl md:text-sm font-semibold ${
          active === 2 ? "text-black" : "text-gray-400 "
        }`}
      >
        <FaUser />
        <span className="hidden md:block">DITANDAI</span>
      </button>
    </div>
  );
};

export default TabsSection;
