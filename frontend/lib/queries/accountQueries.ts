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
  created_at: number;
  updated_at: number;
};

export const getAccountDetail = async (data: LoginResponse) => {
  const res = await axios.get(`${API_URL}/accounts`, {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });

  const users: AccountResponse[] = res.data.filter(
    (user: AccountResponse) => user.user_id === data.id
  );

  const user = { ...users[0], username: data.username };

  return user;
};
