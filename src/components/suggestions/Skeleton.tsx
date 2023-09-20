const Skeleton = () => {
  return (
    <div className="animate-pulse mt-5">
      <div className="w-full flex justify-between gap-3 items-center">
        <div className="w-[50px] h-[50px] rounded-full bg-slate-300"></div>
        <div className="">
          <h1 className="w-[200px] p-2 mb-2 bg-slate-300"></h1>
          <p className="w-[200px] p-1 bg-slate-300"></p>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
