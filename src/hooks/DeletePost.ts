import axios from "axios";

export const DeletePost = async (id: string) => {
  const res = await axios.delete("/api/posts/delete?post_id=" + id);
  return res.data;
};
