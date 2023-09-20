import NavBottom from "@/components/nav-bottom/NavBottom";
import NavTop from "@/components/nav-top/NavTop";
import Sidebar from "@/components/sidebar/Sidebar";
import Profile from "../Profile";
import Highlight from "../Highlight";
import Media from "../Media";
import { Metadata } from "next";
import axios from "axios";
import { getServerSession } from "next-auth";

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
  const data = await getUserProfile(params.username);
  const session = await getServerSession();
  const user = data.data;
  if (!data.success) return <div>NOT FOUND!</div>;
  return (
    <main className="md:flex">
      <NavTop />
      <Sidebar />
      <div className="min-h-screen md:py-9 p-5 md:p-10  w-full md:w-[80%]">
        <Profile userProfile={user} />
        {session?.user?.email === user.email && <Highlight />}
        <Media />
      </div>
      <NavBottom />
    </main>
  );
}

export default UserProfile;
