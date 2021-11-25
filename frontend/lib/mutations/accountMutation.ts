import axios from "axios";
import { API_URL } from "../url";
import { LoginResponse } from "./authMutations";

export type NewAccountInputs = {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  access_token: string;
};

export interface NewAccountResponse extends NewAccountInputs {
  id: number;
  is_master: number;
  username: string;
  created_at: number;
  updated_at: number;
}

export const postNewAccount = async (data: NewAccountInputs) => {
  const { access_token } = data;
  const newAcc = { ...data, is_member: 1, is_master: 0 };
  const res = await axios.post(`${API_URL}/accounts`, newAcc, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return res.data;
};
