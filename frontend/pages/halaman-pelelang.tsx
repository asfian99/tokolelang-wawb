import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Head from "next/head";
import nookies from "nookies";
import LelangBaruButton from "../components/halamanPelelang/LelangBaruButton";

const HalamanPelelang: NextPage = () => {
  return (
    <>
      <Head>
        <title>Halaman Pelelang - TokoLelang</title>
      </Head>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Halaman Pelelang</h2>

        <div className="flex flex-row items-center justify-between mr-8">
          <h3 className="mr-8 text-xl font-semibold ">
            Daftar Barang Dilelangkan
          </h3>
          <LelangBaruButton />
        </div>

        <div className="flex flex-col mt-4">
          {/* <LelangTable data={productPenawaran} /> */}
        </div>
      </div>
    </>
  );
};

export default HalamanPelelang;

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
