/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const HighlightSection = () => {
  return (
    <div className="w-full flex flex-row gap-3 md:gap-5 overflow-x-auto py-3 md:py-5">
      <button className="space-y-3 w-16 md:w-20">
        <div className="w-16 md:w-20 md:h-20 h-16 bg-gray-100 rounded-full font-bold text-xl flex justify-center items-center border-[3px] border-gray-200 hover:border-gray-400">
          <FaPlus />
        </div>
        <div className="w-16 md:w-20 md:h-20">
          <p className="text-sm text-center">Baru</p>
        </div>
      </button>
      {[...Array(8)].map((_, index) => (
        <Link
          key={index}
          href="#"
          className="space-y-3 w-16 md:w-20 scroll-m-0"
        >
          <img
            src="/user.jpg"
            className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-full border-[3px] border-gray-200 hover:border-gray-400"
            alt=""
          />
          <div className="w-16 md:w-20 md:h-20">
            <p className="text-sm text-center">Title</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HighlightSection;
