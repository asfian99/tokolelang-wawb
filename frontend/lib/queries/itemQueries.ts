import axios from "axios";
import { LoginResponse } from "../mutations/authMutations";
import { ItemResponse } from "../mutations/itemMutations";
import { API_URL } from "../url";
import { getTransactions } from "./transactionQueries";

export const getItems = async (data: LoginResponse) => {
  const res = await axios.get<ItemResponse[]>(`${API_URL}/items`, {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });

  return res.data;
};

export const getItemsWithTrans = async (data: LoginResponse) => {
  const res = await axios.get<ItemResponse[]>(`${API_URL}/items`, {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });

  const res2 = await getTransactions(data);
  const items = res.data.map((item) => {
    const trans = res2.filter((tran) => tran.item_id === item.id);
    return { ...item, transactions: trans };
  });

  return items;
};

export const getItemDetail = async (
  data: LoginResponse,
  slug: string | string[] | undefined
) => {
  if (slug) {
    let id = ["", ""];
    if (Array.isArray(slug)) id = slug.join().split("_");
    else id = slug.split("_");

    const res = await axios.get(`${API_URL}/items/${id[1]}`, {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    return res.data;
  } else {
    return [];
  }
};
