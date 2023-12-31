import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram - Sign up",
};

import Head from "./Head";
import OrRow from "./OrRow";
import FormSignUp from "./FormSignUp";
import Footer from "./Footer";
import GoogleButtonLogin from "./GoogleButtonLogin";

const PageSignup = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-3 py-3">
      <div className="sm:w-[350px] px-4 pt-4 sm:border w-full">
        <Head />
        <GoogleButtonLogin />
        <OrRow />
        <FormSignUp />
      </div>
      <Footer />
    </div>
  );
};

export default PageSignup;
