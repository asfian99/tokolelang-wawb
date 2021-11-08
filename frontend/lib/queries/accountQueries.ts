import axios from "axios";
import { LoginResponse } from "../mutations/authMutations";

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

// const token = "";

export const getAccountDetail = async (data: LoginResponse) => {
  const res = await axios.get("http://localhost:8080/api/accounts", {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });

  const users: AccountResponse[] = res.data.filter(
    (user: AccountResponse) => user.user_id === data.id
  );

  const user = { ...users[0], username: data.username };

  return user;
};
