"use client";
import Brand from "./Brand";
import Menu from "./Menu";
const Sidebar = () => {
  return (
    <>
      <div className="lg:w-[244px] w-max min-h-screen border-r-2 fixed top-0 left-0 p-3 px-5 z-40 hidden md:block">
        <Brand />
        <Menu />
      </div>
      <div className="md:w-[20%] hidden md:block p-3 px-5"></div>
    </>
  );
};

export default Sidebar;
