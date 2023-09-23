import Layout from "@/components/layout/Layout";
import React from "react";
import Form from "./Form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reset password",
};
const PageResetPassword = () => {
  return (
    <Layout>
      <Form />
    </Layout>
  );
};

export default PageResetPassword;
