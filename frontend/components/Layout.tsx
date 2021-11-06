import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./Navigation/Navbar";
import Sidebar from "./Navigation/Sidebar";

type AppProps = {
  children: JSX.Element;
};
const queryClient = new QueryClient();

const Layout = ({ children }: AppProps): JSX.Element => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen">
          <Navbar />
          <div className="flex flex-row font-sans">
            <Sidebar />
            <div className="p-4 ml-64">{children}</div>
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
};

export default Layout;
