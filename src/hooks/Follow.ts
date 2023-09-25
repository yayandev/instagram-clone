import axios from "axios";

export const Follow = async (id: string) => {
  const res = await axios.get("/api/follow/" + id);
  return res.data;
};
