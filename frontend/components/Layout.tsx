import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./navigation/Navbar";
import Sidebar from "./navigation/Sidebar";
import { userContext, userDefault } from "../lib/contexts/userContext";
import type { AuthUserType } from "../lib/contexts/userContext";
import { useCheckLoginStatus } from "../lib/hooks/useCheckLoginStatus";
// import Script from "next/script";

type AppProps = {
  children: JSX.Element;
};

const queryClient = new QueryClient();
const userContextDefault: AuthUserType = {
  authenticated: false,
  data: userDefault,
};

const Layout = ({ children }: AppProps): JSX.Element => {
  const { pathname } = useRouter();
  const [user, setUser] = React.useState(userContextDefault);
  const res = useCheckLoginStatus({ user, setUser });

  const getSlug = useCallback(
    () =>
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/tentang-kami" ||
      pathname === "/kontak" ||
      pathname === "/fitur" ||
      pathname === "/_error" ||
      pathname === "/",
    [pathname]
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <userContext.Provider value={{ user, setUser }}>
          {getSlug() ? (
            <div className="min-h-screen antialiased">
              <Navbar user={user} />
              <div className="flex flex-row text-text-d font-inter">
                <div className="w-full px-8 py-4">{children}</div>
              </div>
            </div>
          ) : (
            <div className="min-h-screen antialiased text-text-">
              <Navbar user={user} />
              <div className="flex flex-row font-inter">
                <Sidebar user={user} />
                <div className="w-full px-8 py-4 ml-64">{children}</div>
              </div>
            </div>
          )}
        </userContext.Provider>
      </QueryClientProvider>
    </>
  );
};

export default Layout;
