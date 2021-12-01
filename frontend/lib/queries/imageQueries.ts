import axios from "axios";
import { LoginResponse } from "../mutations/authMutations";
import { ImageResponse } from "../mutations/imageMutations";
import { API_URL } from "../url";

export const getImages = async (data: LoginResponse) => {
  const res = await axios.get(`${API_URL}/images`, {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });

  return res.data;
};

export const getItemImages = async (
  data: LoginResponse,
  slug: string | string[] | undefined
) => {
  if (slug) {
    let id = ["", ""];
    if (Array.isArray(slug)) id = slug.join().split("_");
    else id = slug.split("_");

    const res = await axios.get(`${API_URL}/images`, {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    const itemImages = res.data.filter(
      (item: ImageResponse) => item.item_id === Number(id[1])
    );

    return itemImages[0];
  } else {
    return [];
  }
};
