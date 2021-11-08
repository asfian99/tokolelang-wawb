import React, { useContext } from "react";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { userContext, userDefault } from "../../lib/contexts/userContext";

const LogoutButton = () => {
  const router = useRouter();
  const { setUser } = useContext(userContext);

  const onLogout = () => {
    destroyCookie(null, "token");
    setUser({ authenticated: false, data: userDefault });
    router.replace("/");
  };

  return (
    <div className="flex flex-row justify-end mt-6">
      <button
        onClick={onLogout}
        // disabled={reqStatus.loading}
        className="w-32 py-2 text-white bg-red-500 rounded-lg py-2font-bold disabled:bg-red-300 hover:bg-red-600 "
      >
        {"Logout"}
      </button>
    </div>
  );
};

export default LogoutButton;
