import axios from "axios";
import { parseCookies } from "nookies";
import { formatUnixTime, getTimeStamp } from "../formatDateTime";
import { API_URL } from "../url";
import { LoginResponse } from "./authMutations";
import { TransactionResponse } from "./transactionMutations";

export interface ItemInputs {
  name: string;
  description: string;
  open_bid: number;
  closing_time: string | number;
  fundraising: boolean | number;
  bid_ratio: number;
  event?: string;
  location: string;
}
export interface ItemResponse extends ItemInputs {
  account_id?: number;
  id: number;
  created_at: number;
  updated_at: number;
}

export interface ItemResponseWithTrans extends ItemResponse {
  transactions: TransactionResponse[];
}

const cookie = parseCookies();
const cValue = cookie.token ? cookie.token?.split("&") : ["", "", ""];
const [access_token, id, username] = cValue;

export const postItem = async (input: ItemInputs) => {
  const ts = getTimeStamp();
  if (!id || !access_token) {
    console.log("cookie not found!");
    return {};
  } else {
    const req = {
      ...input,
      closing_time: formatUnixTime(input.closing_time),
      fundraising: input.fundraising ? 1 : 0,
      account_id: id,
      created_at: ts,
      updated_at: ts,
    };
    const res = await axios.post(`${API_URL}/items`, req, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return res.data;
  }
};

export const patchItem = async (
  input: ItemInputs,
  slug: string | string[] | undefined
) => {
  const ts = getTimeStamp();
  if (!id || !access_token) {
    console.log("cookie not found!");
    return {};
  } else {
    if (!slug) {
      return [];
    } else {
      let iid = ["", ""];
      if (Array.isArray(slug)) iid = slug.join().split("_");
      else iid = slug.split("_");

      const req = {
        ...input,
        closing_time: formatUnixTime(input.closing_time),
        fundraising: input.fundraising ? 1 : 0,
        updated_at: ts,
      };
      const res = await axios.patch(`${API_URL}/items/${iid[1]}`, req, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      return res.data;
    }
  }
};
