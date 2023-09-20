import Link from "next/link";

const Footer = () => {
  return (
    <div className="sm:w-[350px] p-4 sm:border w-full text-center">
      <span className="text-sm">
        Don't have an account?{" "}
        <Link href={"/signup"} className="text-[#0095f6]">
          Sign up
        </Link>
      </span>
    </div>
  );
};

export default Footer;
