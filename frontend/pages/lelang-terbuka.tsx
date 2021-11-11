import { GetServerSideProps, NextPage } from "next";
import React from "react";
import nookies from "nookies";
import Products from "../components/lelangTerbuka/Products";
import Head from "next/head";

const LelangTerbuka: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lelang Terbuka - TokoLelang</title>
      </Head>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Lelang Terbuka</h2>

        <Products />
      </div>
    </>
  );
};

export default LelangTerbuka;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);

  if (!cookies.token || cookies.token.length < 25) {
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
