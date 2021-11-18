import axios from "axios";
import { parseCookies } from "nookies";
import { formatUnixTime, getTimeStamp } from "../formatDateTime";
import { LoginResponse } from "./authMutations";

export interface PostItemInputs {
  name: string;
  description: string;
  open_bid: number;
  closing_time: string | number;
  fundraising: boolean | number;
  bid_ratio: number;
  event?: string;
  location: string;
}
export interface PostItemResponse extends PostItemInputs {
  id: number;
  created_at: number;
  updated_at: number;
}

const cookie = parseCookies();
const cValue = cookie.token ? cookie.token?.split("&") : ["", "", ""];
const [access_token, id, username] = cValue;

export const postItem = async (input: PostItemInputs) => {
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
    const res = await axios.post("http://localhost:8080/api/items", req, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return res.data;
  }
};
