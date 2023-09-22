import React from "react";

const Skeleton = () => {
  return (
    <div className="w-full flex gap-10 px-10 py-5 animate-pulse">
      <div className="md:w-[150px] md:h-[150px] w-[65px] h-[65px] rounded-full bg-slate-300"></div>
      <div className="">
        <div className="w-[200px] h-[30px] bg-slate-300 my-2"></div>
        <div className="w-[200px] h-[30px] bg-slate-300 my-2"></div>
        <div className="w-[200px] h-[30px] bg-slate-300 my-2"></div>
      </div>
    </div>
  );
};

export default Skeleton;
