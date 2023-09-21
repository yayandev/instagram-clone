import { Metadata } from "next";
import Form from "./Form";
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Instagram - Edit profile",
};

const PageEdit = async () => {
  return (
    <Layout>
      <div className="min-h-screen py-9 px-5 md:px-10 w-full md:w-[80%]">
        <Form />
      </div>
    </Layout>
  );
};

export default PageEdit;
