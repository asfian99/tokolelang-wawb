import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React from "react";
import Head from "next/head";
import nookies from "nookies";
import RiwayatTable from "../components/riwayat/RiwayatTable";
import { getTransactionsOnUser } from "../lib/queries/transactionQueries";
import { TransactionUserResponse } from "../lib/mutations/transactionMutations";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import Loading from "../components/pageStatus/Loading";
import RequestFailed from "../components/pageStatus/RequestFailed";

const Riwayat: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { cookie } = props;

  const transactions = useQuery<TransactionUserResponse[], AxiosError>(
    `transaction_${cookie.username}`,
    () => getTransactionsOnUser(cookie)
  );

  console.log(transactions.data);

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
        {transactions.status === "loading" && <Loading />}
        {transactions.status === "error" && <RequestFailed />}
        {transactions.data && (
          <div className="flex flex-col mt-4">
            <RiwayatTable data={transactions.data} />
          </div>
        )}
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

  const cValue = cookies.token.split("&");
  const [access_token, id, username] = cValue;
  return {
    props: {
      cookie: { access_token, id: Number(id), username },
    },
  };
};
