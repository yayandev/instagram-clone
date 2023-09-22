"use client";
import ModalAddPosts from "@/components/modal/add-posts/ModalAddPosts";
import NavBottom from "@/components/nav-bottom/NavBottom";
import NavTop from "@/components/nav-top/NavTop";
import Sidebar from "@/components/sidebar/Sidebar";
import { useSession } from "next-auth/react";
import Spinner from "../spinner/Spinner";
import { fetcher } from "@/utils/swr/fetcher";
import useSWR from "swr";

function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { data, error, isLoading } = useSWR(
    "/api/users?email=" + session?.user?.email,
    fetcher
  );

  if (status === "loading" || isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error) return <div>Server error</div>;

  return (
    <main className="md:flex">
      <NavTop session={session} />
      <Sidebar data={data} status={status} />
      <div className="min-h-screen py-9 px-5 md:px-10 w-full md:w-[80%]">
        {children}
      </div>
      {session && <NavBottom user={data?.data} />}
      <ModalAddPosts />
    </main>
  );
}

export default Layout;
