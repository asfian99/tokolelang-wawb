import { parseCookies } from "nookies";
import { useEffect } from "react";
import { getAccountDetail } from "../queries/accountQueries";
import type { userContextType } from "../contexts/userContext";

export const useCheckLoginStatus = ({ user, setUser }: userContextType) => {
  // const [user, setUser] = useState<AuthUserType>(userContextDefault);
  console.log("check login status");
  const cookies = parseCookies();

  useEffect(() => {
    const cookies = parseCookies();

    const fetch = async () => {
      const cValue = cookies.token.split("&");
      const res = await getAccountDetail({
        access_token: cValue[0],
        id: Number(cValue[1]),
        username: cValue[2],
      });

      const { id, username, is_member, is_master, user_id } = res;
      setUser({
        authenticated: true,
        data: { id, username, user_id, is_member, is_master },
      });

      return res;
    };

    if (cookies.token) {
      fetch();
    }
  }, [setUser]);

  if (cookies.token) return "Logged in";
  return "Need to login";
};
