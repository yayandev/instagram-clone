import Layout from "@/components/layout/Layout";
import { Metadata } from "next";
import Form from "./Form";
export const metadata: Metadata = {
  title: "Change Username",
};
const PageChangeUsername = () => {
  return (
    <Layout>
      <div className="min-h-screen py-9 px-5 md:px-10 w-full md:w-[80%]">
        <Form />
      </div>
    </Layout>
  );
};

export default PageChangeUsername;
