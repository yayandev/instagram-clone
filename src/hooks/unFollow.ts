import axios from "axios";

export const unFollow = async (id: string) => {
  const res = await axios.get("/api/unfollow/" + id);
  return res.data;
};
