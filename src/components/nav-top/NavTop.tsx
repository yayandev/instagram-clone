import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaRegMessage } from "react-icons/fa6";

const NavTop = ({ session }: any) => {
  return (
    <>
      <div className="md:hidden max-h-[60px] fixed top-0 w-full border-b-2 bg-white p-2 flex items-center justify-between">
        <div>
          <Link href={"/"}>
            <Image
              src={"/logo-nobg.png"}
              width={100}
              height={50}
              alt="instagram"
            />
          </Link>
        </div>
        {session && (
          <div className="flex gap-3">
            <Link
              href={"#"}
              className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
            >
              <FaRegHeart />
            </Link>
            <Link
              href={"#"}
              className="flex gap-3 items-center justify-center lg:justify-start text-xl lg:text-lg  p-2 rounded-sm hover:bg-slate-200"
            >
              <FaRegMessage />
            </Link>
          </div>
        )}
      </div>
      <div className="md:hidden h-[50px]"></div>
    </>
  );
};

export default NavTop;
