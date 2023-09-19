import Link from "next/link";

const Information = () => {
  return (
    <div>
      <p className="text-[12px] text-center my-2 text-[#737373] font-[200]">
        People who use our service may have uploaded your contact information to
        Instagram.{" "}
        <Link href={"#"} className="text-[#00376b]">
          Learn more
        </Link>
      </p>
      <p className="text-[12px] text-center my-2 text-[#737373] font-[200]">
        By signing up, you agree to our Terms ,{" "}
        <Link href={"#"} className="text-[#00376b]">
          Privacy
        </Link>{" "}
        <Link href={"#"} className="text-[#00376b]">
          Policy
        </Link>{" "}
        and{" "}
        <Link href={"#"} className="text-[#00376b]">
          Cookies Policy
        </Link>{" "}
        .
      </p>
    </div>
  );
};

export default Information;
