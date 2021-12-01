import axios from "axios";
import { LoginResponse } from "../mutations/authMutations";
import { TransactionResponse } from "../mutations/transactionMutations";
import { API_URL } from "../url";
import { getAllAccounts } from "./accountQueries";
import { getItems, getItemsWithTrans } from "./itemQueries";

export const getTransactions = async (data: LoginResponse) => {
  const res = await axios.get<TransactionResponse[]>(
    `${API_URL}/transactions`,
    { headers: { Authorization: `Bearer ${data.access_token}` } }
  );

  return res.data;
};

export const getTransactionsOnUser = async (data: LoginResponse) => {
  const res = await axios.get<TransactionResponse[]>(
    `${API_URL}/transactions`,
    { headers: { Authorization: `Bearer ${data.access_token}` } }
  );

  const items = await getItemsWithTrans(data);
  const trans = res.data.filter(
    (transaction) => transaction.account_id === data.id
  );
  const transWithItemName = trans.map((transaction) => {
    const item = items.filter((item) => item.id === transaction.item_id);
    const otherTrans = trans.filter(
      (tran) => tran.item_id === transaction.item_id
    );

    if (otherTrans.length > 1) {
      otherTrans.sort((a, b) => {
        if (a.bid_value < b.bid_value) return 1;
        if (a.bid_value > b.bid_value) return -1;
        else return 0;
      });
    }

    return {
      ...transaction,
      is_highest:
        otherTrans.length <= 1
          ? 1
          : otherTrans[0].id === transaction.id
          ? 1
          : 0,
      name: item[0].name,
      open_bid: item[0].open_bid,
      closing_time: Number(item[0].closing_time),
    };
  });

  return transWithItemName;
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
