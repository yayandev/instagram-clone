import Profile from "../Profile";
import Highlight from "../Highlight";
import Media from "../Media";
import { Metadata } from "next";
import axios from "axios";
import { getServerSession } from "next-auth";
import Layout from "@/components/layout/Layout";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const username = params.username;
  return {
    title: "Instagram - " + username,
  };
}

const getUserProfile = async (username: string) => {
  const res: any = await axios.get(
    `${process.env.DOMAIN}/api/users/${username}`
  );
  return res.data;
};

async function UserProfile({ params }: { params: { username: string } }) {
  const session = await getServerSession();
  const data = await getUserProfile(params.username);
  const user = data.data;
  return (
    <Layout>
      {!user ? (
        <div className="w-full mt-10 flex justify-center items-center">
          <h1 className="font-bold text-xl">USER TIDAK DITEMUKAN!</h1>
        </div>
      ) : (
        <div>
          <Profile userProfile={user} />
          {session && (
            <div>{session?.user?.email === user.email && <Highlight />}</div>
          )}
          <Media />
        </div>
      )}
    </Layout>
  );
}

export default UserProfile;
