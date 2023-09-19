import Link from "next/link";

const Footer = () => {
  return (
    <div className="sm:w-[350px] p-4 sm:border w-full text-center">
      <span className="text-sm">
        Have an account?{" "}
        <Link href={"/login"} className="text-[#0095f6]">
          Log in
        </Link>
      </span>
    </div>
  );
};

export default Footer;
