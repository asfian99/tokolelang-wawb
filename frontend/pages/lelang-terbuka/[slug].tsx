import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import nookies from "nookies";
import Image from "next/image";
import PlaceholderImg from "../../assets/placeholder-img.png";
import ProductInfo from "../../components/productDetail/ProductInfo";
import BuatPenawaranButton from "../../components/productDetail/BuatPenawaranButton";
import PelelangInfo from "../../components/productDetail/PelelangInfo";
import LelangTable from "../../components/productDetail/LelangTable";

export interface PenawaranInterface {
  id: number;
  username: string;
  datetime: string;
  bid: string;
}

const productPenawaran: PenawaranInterface[] = [
  {
    id: 1,
    username: "k_asfian",
    datetime: "12/11/2021 - 19.20",
    bid: "10.250.000",
  },
  {
    id: 2,
    username: "k_asfian",
    datetime: "12/11/2021 - 19.20",
    bid: "10.110.000",
  },
  {
    id: 3,
    username: "k_asfian",
    datetime: "12/11/2021 - 19.20",
    bid: "10.210.000",
  },
  {
    id: 4,
    username: "k_asfian",
    datetime: "12/11/2021 - 19.20",
    bid: "10.050.000",
  },
  {
    id: 5,
    username: "k_asfian",
    datetime: "12/11/2021 - 19.20",
    bid: "9.800.000",
  },
];

const ProductDetail: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lorem ipsum dolor sit amet. - TokoLelang</title>
      </Head>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Product Detail</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="my-4 mr-2">
            <Image
              className="border border-gray-300 cursor-pointer rounded-2xl"
              src={PlaceholderImg}
              alt="placeholderImageDetail"
              height="400"
              width="540"
              objectFit="cover"
            />
          </div>

          <div className="flex flex-col pr-8 mb-4">
            <ProductInfo />
            <BuatPenawaranButton />
          </div>
        </div>

        <PelelangInfo />

        <div className="flex flex-col mt-4">
          <h3 className="text-xl font-bold">Daftar Penawaran</h3>
          <LelangTable data={productPenawaran} />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

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
