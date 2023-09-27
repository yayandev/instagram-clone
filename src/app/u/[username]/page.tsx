import Profile from "../Profile";
import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import axios from "axios";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const res = await axios.get(
    `${process.env.DOMAIN}/api/users/${params.username}`
  );
  const data = res.data;
  const user = data.data;

  if (!user) {
    return {
      title: "404",
    };
  }

  const name = user.name;
  const images = user.images;
  return {
    title: "Instagram - @" + name,
    openGraph: {
      images: [{ url: images }],
    },
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
