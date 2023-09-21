import Layout from "@/components/layout/Layout";
import PostsList from "@/components/posts/PostsList";
import Stories from "@/components/stories/Stories";
import Suggestions from "@/components/suggestions/Suggestions";

async function Home() {
  return (
    <Layout>
      <div className="w-full flex justify-between">
        <div className="lg:w-[65%] w-full">
          <Stories />
          <PostsList />
        </div>
        <div className="w-[30%] lg:block hidden p-3">
          <Suggestions />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
