import Image from "next/image";
import React from "react";

const Brand = () => {
  return (
    <div className="w-full py-3 lg:block hidden">
      <Image src={"/logo-nobg.png"} width={100} height={100} alt="Instagram" />
    </div>
  );
};

export default Brand;
