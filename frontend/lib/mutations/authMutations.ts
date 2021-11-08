import axios from "axios";

export type LoginInputs = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  username: string;
  access_token: string;
};

export type RegisterInputs = {
  username: string;
  password: string;
  password_repeat: string;
};

export type RegisterResponse = LoginResponse;

export const postLogin = async (data: LoginInputs) => {
  const res = await axios.post("http://localhost:8080/api/user/login", data);

  return res.data;
};

export const postRegister = async (data: RegisterInputs) => {
  const res = await axios.post("http://localhost:8080/api/user/register", data);

  return res.data;
};
