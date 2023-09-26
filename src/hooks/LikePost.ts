import axios from "axios";

export const LikePost = async (id: string) => {
  const res = await axios.post("/api/likes", {
    postID: id,
  });
  return res.data;
};
