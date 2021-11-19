import axios from "axios";
import { LoginResponse } from "../mutations/authMutations";
import { PostImageResponse } from "../mutations/imageMutations";
import { API_URL } from "../url";

export const getImages = async (data: LoginResponse) => {
  const res = await axios.get(`${API_URL}/images`, {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });

  return res.data;
};

export const getItemImages = async (
  data: LoginResponse,
  itemId: string | number
) => {
  if (itemId) {
    const res = await axios.get(`${API_URL}/images`, {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    const itemImages = res.data.filter(
      (item: PostImageResponse) => item.item_id === Number(itemId)
    );

    return itemImages;
  } else {
    return [];
  }
};
