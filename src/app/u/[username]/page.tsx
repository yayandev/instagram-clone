import NavBottom from "@/components/nav-bottom/NavBottom";
import NavTop from "@/components/nav-top/NavTop";
import Sidebar from "@/components/sidebar/Sidebar";
import Profile from "../Profile";
import Highlight from "../Highlight";
import Media from "../Media";

export default function UserProfile({
  params,
}: {
  params: { username: string };
}) {
  return (
    <main className="md:flex">
      <NavTop />
      <Sidebar />
      <div className="min-h-screen md:py-9 p-5 md:p-10  w-full md:w-[80%]">
        <Profile />
        <Highlight />
        <Media />
      </div>
      <NavBottom />
    </main>
  );
}
