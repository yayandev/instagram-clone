"use client";
import Image from "next/image";

const Images = ({ images }: { images: string }) => {
  return (
    <div className="w-full max-h-[350px] object-contain">
      <Image
        src={images}
        width={300}
        height={250}
        className="w-full max-h-[350px] object-contain"
        alt="Post"
      />
    </div>
  );
};

export default Images;
