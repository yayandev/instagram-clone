import { BsPlus } from "react-icons/bs";

const Highlight = () => {
  return (
    <div className="w-full my-3">
      <div className="w-max">
        <button className="w-[50px] md:w-[80px] h-[50px] md:h-[80px] rounded-full flex justify-center items-center bg-[#fafafa] border-slate-300 border text-3xl text-slate-300">
          <BsPlus />
        </button>
        <p className="font-semibold text-center mt-2 text-sm">New</p>
      </div>
    </div>
  );
};

export default Highlight;
