import { createContext } from "react";

export interface UserType {
  id: number;
  username: string;
  is_member: number;
  is_master: number;
  user_id: number;
}

export interface AuthUserType {
  authenticated: boolean;
  data: UserType;
}

export const userDefault: UserType = {
  id: 0,
  username: "",
  is_member: 0,
  is_master: 0,
  user_id: 0,
};

export interface userContextType {
  user: AuthUserType;
  setUser: (
    value: AuthUserType | ((prevVar: AuthUserType) => AuthUserType)
  ) => void;
}

export const userContext = createContext<userContextType>({
  user: {
    authenticated: false,
    data: userDefault,
  },
  setUser: () => {},
});
