import axios from "axios";
import type { LoginResponse } from "../mutations/authMutations";
import { API_URL } from "../url";

export type AccountResponse = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_member: number;
  is_master: number;
  user_id: number;
  username: string;
  created_at: number;
  updated_at: number;
};

export const getAllAccounts = async (data: LoginResponse) => {
  const res = await axios.get<AccountResponse[]>(`${API_URL}/accounts`, {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });

  // const user = { ...users[0], username: data.username };

  return res.data;
};

export const getAccountDetail = async (
  data: LoginResponse,
  login?: boolean
) => {
  const res = await axios.get<AccountResponse[]>(`${API_URL}/accounts`, {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });

  console.log(data);

  if (login) {
    const accounts: AccountResponse[] = res.data.filter(
      (account: AccountResponse) => account.user_id === data.id
    );
    return { ...accounts[0] };
  } else {
    const accounts: AccountResponse[] = res.data.filter(
      (account: AccountResponse) => account.id === data.id
    );
    return { ...accounts[0] };
  }
};
