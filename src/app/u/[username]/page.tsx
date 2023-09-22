import Profile from "../Profile";
import { Metadata } from "next";
import Layout from "@/components/layout/Layout";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  return {
    title: "Instagram - " + params.username,
  };
}

async function UserProfile({ params }: { params: { username: string } }) {
  return (
    <Layout>
      <Profile username={params.username} />
    </Layout>
  );
}

export default UserProfile;
