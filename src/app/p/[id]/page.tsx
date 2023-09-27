import Layout from "@/components/layout/Layout";
import axios from "axios";
import { Metadata } from "next";
import Images from "./Images";
import Header from "./Header";
import Comments from "./Comments";
import ClientOnly from "@/components/layout/ClientOnly";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await axios.get(
    `${process.env.DOMAIN}/api/posts?post_id=${params.id}`
  );

  if (res.data.data.length === 0) {
    return {
      title: "404",
    };
  } else {
    const title = res.data.data.caption;
    const username = res.data.data.user.username;
    const images = res.data.data.images;
    return {
      title: username + " | " + title,
      openGraph: {
        images: [{ url: images }],
      },
    };
  }
}

const getData = async (id: string) => {
  const res = await axios.get(`${process.env.DOMAIN}/api/posts?post_id=${id}`);
  let data = res.data.data;
  return data;
};

const PostDetailPage = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  const data = await getData(postId);

  return (
    <Layout>
      <div className="w-full flex sm:flex-row flex-col justify-between">
        <div className="sm:w-[48%] w-full">
          <Images images={data.images} />
        </div>
        <div className="w-full sm:w-[50%] mt-5 sm:mt-0">
          <Header data={data} />
          <Comments postId={data.id} count={data._count} />
        </div>
      </div>
    </Layout>
  );
};

export default PostDetailPage;
