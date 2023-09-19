import Image from "next/image";

const Head = () => {
  return (
    <>
      <div className="w-full flex justify-center">
        <Image src={"/logo-nobg.png"} width={200} height={100} alt="logo" />
      </div>
      <div className="px-3 my-2">
        <h1 className="text-md text-center font-semibold text-[#737373]">
          Sign up to see photos and videos from your friends.
        </h1>
      </div>
    </>
  );
};

export default Head;
