import axios from "axios";
import { LoginResponse } from "../mutations/authMutations";
import { TransactionResponse } from "../mutations/transactionMutations";
import { API_URL } from "../url";
import { getAllAccounts } from "./accountQueries";

export const getTransactions = async (data: LoginResponse) => {
  const res = await axios.get(`${API_URL}/transactions`, {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });

  return res.data;
};

export const getTransactionsOnItem = async (
  data: LoginResponse,
  slug: string | string[] | undefined
) => {
  if (slug) {
    let id = ["", ""];
    if (Array.isArray(slug)) id = slug.join().split("_");
    else id = slug.split("_");

    const res = await axios.get<TransactionResponse[]>(
      `${API_URL}/transactions`,
      { headers: { Authorization: `Bearer ${data.access_token}` } }
    );

    const users = await getAllAccounts(data);
    const trans = res.data.filter((item) => item.item_id === Number(id[1]));
    const transWithUname = trans.map((transaction) => {
      const user = users.filter((user) => transaction.account_id === user.id);
      return { ...transaction, username: user[0].username };
    });

    return transWithUname;
  } else {
    return [];
  }
};
