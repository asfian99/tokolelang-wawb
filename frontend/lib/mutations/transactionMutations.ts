import axios from "axios";
import { parseCookies } from "nookies";
import { getTimeStamp } from "../formatDateTime";
import { API_URL } from "../url";
import { LoginResponse } from "./authMutations";

export type TransactionInputs = {
  bid_value: number;
  item_id: number;
};

export interface TransactionResponse extends TransactionInputs {
  id: number;
  account_id: number;
  is_highest: number;
  created_at: number;
  updated_at: number;
}

export interface TransactionItemResponse extends TransactionResponse {
  username: string;
}

export interface TransactionUserResponse extends TransactionResponse {
  name: string;
  open_bid: number;
  closing_time: number;
}

const cookie = parseCookies();
const cValue = cookie.token ? cookie.token?.split("&") : ["", "", ""];
const [access_token, id, username] = cValue;

export const postTransaction = async (data: TransactionInputs) => {
  const ts = getTimeStamp();
  const newTrans = {
    ...data,
    account_id: id,
    is_highest: 0,
    created_at: ts,
    updated_at: ts,
  };
  const res = await axios.post(`${API_URL}/transactions`, newTrans, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return res.data;
};
