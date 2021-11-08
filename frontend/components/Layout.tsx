import React from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./navigation/Navbar";
import Sidebar from "./navigation/Sidebar";

type AppProps = {
  children: JSX.Element;
};
const queryClient = new QueryClient();

const Layout = ({ children }: AppProps): JSX.Element => {
  const { pathname } = useRouter();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {pathname === "/login" ||
        pathname === "/signup" ||
        pathname === "/_error" ||
        pathname === "/" ? (
          <div className="min-h-screen">
            <Navbar />
            <div className="flex flex-row font-sans">
              <div className="w-full px-8 py-4">{children}</div>
            </div>
          </div>
        ) : (
          <div className="min-h-screen">
            <Navbar />
            <div className="flex flex-row font-sans">
              <Sidebar />
              <div className="w-full px-8 py-4 ml-64">{children}</div>
            </div>
          </div>
        )}
      </QueryClientProvider>
    </>
  );
};

export default Layout;
