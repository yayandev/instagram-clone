import ModalAddPosts from "@/components/modal/add-posts/ModalAddPosts";
import NavBottom from "@/components/nav-bottom/NavBottom";
import NavTop from "@/components/nav-top/NavTop";
import Sidebar from "@/components/sidebar/Sidebar";
import { getServerSession } from "next-auth";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  return (
    <main className="md:flex">
      <NavTop session={session} />
      <Sidebar />
      <div className="min-h-screen py-9 px-5 md:px-10 w-full md:w-[80%]">
        {children}
      </div>
      {session && <NavBottom />}
      <ModalAddPosts />
    </main>
  );
}

export default Layout;
