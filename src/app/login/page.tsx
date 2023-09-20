"use client";
import FormLogin from "./FormLogin";
import Header from "./Header";
import Footer from "./Footer";

const PageLogin = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-3">
      <div className="sm:w-[350px] px-4 pt-4 sm:border w-full">
        <Header />
        <FormLogin />
      </div>
      <Footer />
    </div>
  );
};

export default PageLogin;
