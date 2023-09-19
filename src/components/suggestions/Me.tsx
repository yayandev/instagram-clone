import Image from "next/image";
import Link from "next/link";
const Me = () => {
  return (
    <div className="w-full flex justify-between gap-3 items-center">
      <Link href={"#"} className="flex items-center gap-3 ">
        <Image
          src={"/user.jpg"}
          width={50}
          height={50}
          alt="Profile"
          className="rounded-full"
        />
        <div>
          <h1 className="text-sm font-semibold">yanz20.ig</h1>
          <p className="text-xs">Yayan faturrohman</p>
        </div>
      </Link>
      <div className="">
        <button className="text-sm text-blue-400 font-semibold">Switch</button>
      </div>
    </div>
  );
};

export default Me;
