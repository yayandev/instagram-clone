import Layout from "@/components/layout/Layout";
import React from "react";
import Form from "./Form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reset password",
};
const ResetPassword = ({ params }: { params: { token: string } }) => {
  return (
    <Layout>
      <Form token={params.token} />
    </Layout>
  );
};

export default ResetPassword;
