"use client";
import ModalAddPosts from "@/components/modal/add-posts/ModalAddPosts";
import NavBottom from "@/components/nav-bottom/NavBottom";
import NavTop from "@/components/nav-top/NavTop";
import Sidebar from "@/components/sidebar/Sidebar";
import Spinner from "../spinner/Spinner";
import ModalSetting from "../modal/settings/ModalSetting";
import { useAuth } from "@/context/AuthContext";
import ClientOnly from "./ClientOnly";

function Layout({ children }: { children: React.ReactNode }) {
  const { loading, user, status } = useAuth();

  if (loading || status === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />;
      </div>
    );
  }

  console.log({ loading, user, status });

  return (
    <main className="md:flex">
      <NavTop />
      <Sidebar />
      <div className="min-h-screen py-9 px-5 md:px-10 w-full md:w-[80%] lg:max-w-[1024px]">
        {children}
      </div>
      <ClientOnly>
        <NavBottom />
      </ClientOnly>
      <ModalAddPosts />
      <ModalSetting />
    </main>
  );
}

export default Layout;
