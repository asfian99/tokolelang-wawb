import React from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./navigation/Navbar";
import Sidebar from "./navigation/Sidebar";
import { userContext, userDefault } from "../lib/contexts/userContext";
import type { AuthUserType } from "../lib/contexts/userContext";
import { useCheckLoginStatus } from "../lib/hooks/useCheckLoginStatus";

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

  console.log({ user });
  console.log(res);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <userContext.Provider value={{ user, setUser }}>
          {pathname === "/login" ||
          pathname === "/signup" ||
          pathname === "/_error" ||
          pathname === "/" ? (
            <div className="min-h-screen">
              <Navbar user={user} />
              <div className="flex flex-row font-sans text-gray-900">
                <div className="w-full px-8 py-4">{children}</div>
              </div>
            </div>
          ) : (
            <div className="min-h-screen text-gray-900">
              <Navbar user={user} />
              <div className="flex flex-row font-sans">
                <Sidebar />
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
