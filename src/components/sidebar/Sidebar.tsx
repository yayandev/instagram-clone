import Brand from "./Brand";
import Menu from "./Menu";
const Sidebar = () => {
  return (
    <>
      <div className="w-[20%] min-h-screen border-r-2 fixed top-0 left-0 p-3 px-5 z-40">
        <Brand />
        <Menu />
      </div>
      <div className="w-[20%] p-3 px-5"></div>
    </>
  );
};

export default Sidebar;
