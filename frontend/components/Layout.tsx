import React from "react";
import Navbar from "./Navbar";

type AppProps = {
  children: JSX.Element;
};

const Layout = ({ children }: AppProps): JSX.Element => {
  return (
    <>
      <Navbar />
      <div className="font-sans">{children}</div>
    </>
  );
};

export default Layout;
