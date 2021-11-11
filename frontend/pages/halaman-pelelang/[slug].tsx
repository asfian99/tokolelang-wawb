import { GetServerSideProps, NextPage } from "next";
import React from "react";
import nookies from "nookies";
import Head from "next/head";

const ProductDilelangkanDetail: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lorem ipsum dolor sit amet. - TokoLelang</title>
      </Head>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">
          Lorem ipsum dolor sit amet.
        </h2>
      </div>
    </>
  );
};

export default ProductDilelangkanDetail;

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
