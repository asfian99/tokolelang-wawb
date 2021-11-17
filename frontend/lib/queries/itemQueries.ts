import axios from "axios";
import { LoginResponse } from "../mutations/authMutations";

export const getItems = async (data: LoginResponse) => {
  const res = await axios.get("http://localhost:8080/api/items", {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });

  return res.data;
};
