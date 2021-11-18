import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Head from "next/head";
import nookies from "nookies";
import RiwayatTable from "../components/riwayat/RiwayatTable";

export interface TransactionInterface {
  id: number;
  account_id: number;
  item_id: number;
  bid_value: number;
  is_highest?: number;
  created_at: number;
  updated_at?: number;
}

export interface RiwayatInterface extends TransactionInterface {
  name: string;
  open_bid: number;
  status: number;
}

const data: RiwayatInterface[] = [
  {
    id: 1,
    account_id: 1,
    item_id: 2,
    name: "Paseo Tissue",
    status: 1,
    open_bid: 7500000,
    bid_value: 10500000,
    created_at: 1633593240000,
    updated_at: 1633593240000,
  },
  {
    id: 1,
    account_id: 1,
    item_id: 2,
    name: "Paseo Tissue 2",
    status: 0,
    open_bid: 6500000,
    bid_value: 7000000,
    created_at: 1633593240000,
    updated_at: 1633593240000,
  },
];

const Riwayat: NextPage = () => {
  return (
    <>
      <Head>
        <title>Riwayat - TokoLelang</title>
      </Head>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Riwayat</h2>

        <div className="flex flex-row items-center justify-between">
          <h3 className="mr-8 text-xl font-semibold ">Riwayat Transaksi</h3>
          {/* <LelangBaruButton /> */}
        </div>

        <div className="flex flex-col mt-4">
          <RiwayatTable data={data} />
        </div>
      </div>
    </>
  );
};

export default Riwayat;

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
