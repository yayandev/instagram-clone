import React from "react";

const Skeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="w-full flex gap-10 px-10 py-5">
        <div className="md:w-[150px] md:h-[150px] w-[65px] h-[65px] rounded-full bg-slate-300"></div>
        <div className="">
          <div className="w-[200px] h-[30px] bg-slate-300 my-2"></div>
          <div className="w-[200px] h-[30px] bg-slate-300 my-2"></div>
          <div className="w-[200px] h-[30px] bg-slate-300 my-2"></div>
        </div>
      </div>
      <div className="mt-5">
        <div className="w-full flex justify-center gap-5">
          <div className="w-[50px] md:w-[100px] h-[20px] bg-slate-300 my-2"></div>
          <div className="w-[50px] md:w-[100px] h-[20px] bg-slate-300 my-2"></div>
          <div className="w-[50px] md:w-[100px] h-[20px] bg-slate-300 my-2"></div>
        </div>
        <div className="w-full flex justify-center gap-5 flex-wrap">
          <div className="w-[100px] md:w-[300px] h-[100px] md:h-[300px] bg-slate-300 my-2"></div>
          <div className="w-[100px] md:w-[300px] h-[100px] md:h-[300px] bg-slate-300 my-2"></div>
          <div className="w-[100px] md:w-[300px] h-[100px] md:h-[300px] bg-slate-300 my-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
