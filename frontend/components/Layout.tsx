import React from "react";
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

  console.log({ user });
  console.log(res);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <userContext.Provider value={{ user, setUser }}>
          {pathname === "/login" ||
          pathname === "/signup" ||
          pathname === "/tentang-kami" ||
          pathname === "/_error" ||
          pathname === "/" ? (
            <div className="min-h-screen antialiased">
              <Navbar user={user} />
              <div className="flex flex-row font-sans text-gray-900">
                <div className="w-full px-8 py-4">{children}</div>
              </div>
            </div>
          ) : (
            <div className="min-h-screen antialiased text-gray-900">
              <Navbar user={user} />
              <div className="flex flex-row font-sans">
                <Sidebar user={user} />
                <div className="w-full px-8 py-4 ml-64">{children}</div>
              </div>
            </div>
          )}
          {/* <Script src="https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js"></Script> */}
        </userContext.Provider>
      </QueryClientProvider>
    </>
  );
};

export default Layout;
