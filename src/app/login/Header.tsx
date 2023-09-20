"use client";

import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full flex justify-center">
      <Image src={"/logo-nobg.png"} width={200} height={100} alt="logo" />
    </div>
  );
};

export default Header;
