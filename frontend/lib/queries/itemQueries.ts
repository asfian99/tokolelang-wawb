import axios from "axios";
import { LoginResponse } from "../mutations/authMutations";

export const getItems = async (data: LoginResponse) => {
  const res = await axios.get("http://localhost:8080/api/items", {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });

  return res.data;
};

export const getItemDetail = async (
  data: LoginResponse,
  slug: string | string[] | undefined
) => {
  if (slug) {
    let id = ["", ""];
    if (Array.isArray(slug)) id = slug.join().split("_");
    else id = slug.split("_");

    const res = await axios.get(`http://localhost:8080/api/items/${id[1]}`, {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    return res.data;
  } else {
    return [];
  }
};
