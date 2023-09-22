import Layout from "@/components/layout/Layout";
import Form from "./Form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Change Password",
};
const PageChangePassword = () => {
  return (
    <Layout>
      <div className="min-h-screen py-9 px-5 md:px-10 w-full md:w-[80%]">
        <Form />
      </div>
    </Layout>
  );
};

export default PageChangePassword;
