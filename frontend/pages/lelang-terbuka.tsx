import { GetServerSideProps, NextPage } from "next";
import React from "react";
import nookies from "nookies";
import Products from "../components/lelangTerbuka/Products";

const LelangTerbuka: NextPage = () => {
  return (
    <div>
      <p>Lelang Terbuka</p>

      <Products />
    </div>
  );
};

export default LelangTerbuka;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);

  if (!cookies.token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
