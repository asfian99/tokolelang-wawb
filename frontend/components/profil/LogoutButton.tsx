import React, { useContext } from "react";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { userContext, userDefault } from "../../lib/contexts/userContext";

const LogoutButton = () => {
  const router = useRouter();
  const { setUser } = useContext(userContext);

  const onLogout = async () => {
    console.log("logout");
    destroyCookie(null, "token");
    setUser({ authenticated: false, data: userDefault });
    router.push("/");
  };

  return (
    <button
      onClick={onLogout}
      // disabled={reqStatus.loading}
      className="w-32 btn-danger"
    >
      {"Logout"}
    </button>
  );
};

export default LogoutButton;
