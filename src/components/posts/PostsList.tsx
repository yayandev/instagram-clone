import Image from "next/image";
import {
  BsBookmark,
  BsChat,
  BsDot,
  BsFillBookmarkFill,
  BsHeart,
  BsSend,
  BsThreeDots,
} from "react-icons/bs";
const PostsList = () => {
  return (
    <div className="w-full py-10 px-16">
      <div className="w-full">
        {/* header post */}
        <div className="w-full flex justify-between">
          <div className="flex gap-2 items-center">
            <Image
              src={"/user.jpg"}
              width={40}
              height={40}
              alt={"Profile"}
              className="rounded-full"
            />
            <h3 className="text-sm font-semibold flex items-center gap-1">
              yanz20.ig <BsDot />{" "}
              <span className="font-semibold text-sm text-slate-400">2d</span>
            </h3>
          </div>
          <button className="font-bold text-lg">
            <BsThreeDots />
          </button>
        </div>
        {/* media post */}
        <div className="w-full my-3">
          <Image
            src={"/post.png"}
            width={200}
            height={200}
            className="w-full border rounded-sm"
            alt="Post"
          />
        </div>
        {/* menu post */}
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <button className="text-xl font-bold">
              <BsHeart />
            </button>
            <button className="text-xl font-bold">
              <BsChat />
            </button>
            <button className="text-xl font-bold">
              <BsSend />
            </button>
          </div>
          <button className="text-xl font-bold">
            <BsBookmark />
          </button>
        </div>
        {/* like post */}
        <div className="w-full my-2">
          <button className="text-sm font-bold">152 likes</button>
        </div>
      </div>
    </div>
  );
};

export default PostsList;
