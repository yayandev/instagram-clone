import PostsList from "@/components/posts/PostsList";
import Sidebar from "@/components/sidebar/Sidebar";
import Stories from "@/components/stories/Stories";
import Suggestions from "@/components/suggestions/Suggestions";

export default function Home() {
  return (
    <main className="flex">
      <Sidebar />
      <div className="min-h-screen py-9 px-5 md:px-10 w-[80%]">
        <div className="w-full flex justify-between">
          <div className="w-[65%]">
            <Stories />
            <PostsList />
          </div>
          <div className="w-[30%] p-3">
            <Suggestions />
          </div>
        </div>
      </div>
    </main>
  );
}
