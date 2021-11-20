import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React, { useState } from "react";
import Head from "next/head";
import nookies from "nookies";
import LelangBaruButton from "../../components/halamanPelelang/lelangBaru/LelangBaruButton";
import DilelangkanTable from "../../components/halamanPelelang/DilelangkanTable";
import { useQuery } from "react-query";
import { PostItemResponse } from "../../lib/mutations/itemMutations";
import { AxiosError } from "axios";
import { getItems } from "../../lib/queries/itemQueries";

export interface DilelangkanInterface {
  id: number;
  name: string;
  description: string;
  open_bid: number;
  closing_time: number;
  fundraising: number;
  user_id: number;
  location: string;
  event: string;
  created_at: number;
  updated_at: number;
}

const data = [
  {
    id: 1,
    name: "Paseo Tissue",
    description:
      "During the course of developing and maintaining a database-driven application, the structure of the database being used evolves just like the source code does.",
    open_bid: 7500000,
    closing_time: 1633593240000,
    fundraising: 0,
    user_id: 1,
    location: "Surabaya",
    event: "",
    created_at: 1636353342,
    updated_at: 1636353342,
  },
  {
    id: 2,
    name: "Paseo Tissue 2",
    description:
      "During the course of developing and maintaining a database-driven application, the structure of the database being used evolves just like the source code does.",
    open_bid: 800000,
    closing_time: 1633593240000,
    fundraising: 1,
    user_id: 1,
    location: "Surabaya",
    event: "",
    created_at: 1636353342,
    updated_at: 1636353342,
  },
  {
    id: 3,
    name: "Paseo Tissue 3",
    description:
      "During the course of developing and maintaining a database-driven application, the structure of the database being used evolves just like the source code does.",
    open_bid: 3500000,
    closing_time: 1633593240000,
    fundraising: 1,
    user_id: 1,
    location: "Surabaya",
    event: "",
    created_at: 1636353342,
    updated_at: 1636353342,
  },
  {
    id: 4,
    name: "Paseo Tissue 4",
    description:
      "During the course of developing and maintaining a database-driven application, the structure of the database being used evolves just like the source code does.",
    open_bid: 2000000,
    closing_time: 1633593240000,
    fundraising: 0,
    user_id: 1,
    location: "Surabaya",
    event: "",
    created_at: 1636353342,
    updated_at: 1636353342,
  },
];

const HalamanPelelang: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { cookie } = props;

  const items = useQuery<PostItemResponse[], AxiosError>("items", () =>
    getItems(cookie)
  );

  const userItems = items.data
    ? items.data.filter((item) => item.account_id === cookie.id)
    : [];

  return (
    <>
      <Head>
        <title>Halaman Pelelang - TokoLelang</title>
      </Head>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Halaman Pelelang</h2>

        <div className="flex flex-row items-center justify-between">
          <h3 className="mr-8 text-xl font-semibold ">
            Daftar Barang Dilelangkan
          </h3>
          <LelangBaruButton />
        </div>

        <div className="flex flex-col mt-4">
          {items.data && <DilelangkanTable data={userItems} />}
        </div>

        {/* <div className="my-8">
          <form>
         
          </form>
        </div> */}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* {res && <Image src={res} alt="me" width="200" height="200" />} */}
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

  const cValue = cookies.token.split("&");
  const [access_token, id, username] = cValue;
  return {
    props: {
      cookie: { access_token, id: Number(id), username },
    },
  };
};
