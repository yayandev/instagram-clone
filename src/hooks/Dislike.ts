import axios from "axios";

export const Dislike = async (id: string) => {
  const res = await axios.delete(`/api/likes?post_id=${id}`);
  return res.data;
};
