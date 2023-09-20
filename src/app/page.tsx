import ModalAddPosts from "@/components/modal/add-posts/ModalAddPosts";
import NavBottom from "@/components/nav-bottom/NavBottom";
import NavTop from "@/components/nav-top/NavTop";
import PostsList from "@/components/posts/PostsList";
import Sidebar from "@/components/sidebar/Sidebar";
import Stories from "@/components/stories/Stories";
import Suggestions from "@/components/suggestions/Suggestions";

async function Home() {
  return (
    <main className="md:flex">
      <NavTop />
      <Sidebar />
      <div className="min-h-screen py-9 px-5 md:px-10 w-full md:w-[80%]">
        <div className="w-full flex justify-between">
          <div className="lg:w-[65%] w-full">
            <Stories />
            <PostsList />
          </div>
          <div className="w-[30%] lg:block hidden p-3">
            <Suggestions />
          </div>
        </div>
      </div>
      <NavBottom />
      <ModalAddPosts />
    </main>
  );
}

export default Home;
