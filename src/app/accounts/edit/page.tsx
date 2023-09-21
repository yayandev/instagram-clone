import { Metadata } from "next";
import Form from "./Form";
import Layout from "@/components/layout/Layout";
import axios from "axios";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Instagram - Edit profile",
};

const getData = async (email: string) => {
  const res = await axios.get(`${process.env.DOMAIN}/api/users?email=${email}`);
  return res.data;
};

const PageEdit = async () => {
  const session: any = await getServerSession();
  const data = await getData(session?.user?.email);
  if (data.success === false) {
    return <div>Server Error!</div>;
  }
  return (
    <Layout>
      <div className="min-h-screen py-9 px-5 md:px-10 w-full md:w-[80%]">
        <Form data={data} />
      </div>
    </Layout>
  );
};

export default PageEdit;
