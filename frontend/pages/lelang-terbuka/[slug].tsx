import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import nookies from "nookies";
import Image from "next/image";
import PlaceholderImg from "../../assets/placeholder-img.png";
import ProductInfo from "../../components/productDetail/ProductInfo";
import BuatPenawaranButton from "../../components/productDetail/BuatPenawaranButton";
import PelelangInfo from "../../components/productDetail/PelelangInfo";
import LelangTable from "../../components/productDetail/LelangTable";
import { useQuery } from "react-query";
import { PostItemResponse } from "../../lib/mutations/itemMutations";
import { AxiosError } from "axios";
import { getItemDetail } from "../../lib/queries/itemQueries";
import Loading from "../../components/pageStatus/Loading";

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

const ProductDetail: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { query } = useRouter();
  const { cookie } = props;
  const { slug } = query;

  const { data, status } = useQuery<PostItemResponse, AxiosError>(
    `itemDetail${slug}`,
    () => getItemDetail(cookie, slug)
  );

  console.log(data);

  return (
    <>
      <Head>
        <title>{data && data.name + " -"} TokoLelang</title>
      </Head>
      {status === "loading" && <Loading />}
      {status === "error" && <Loading />}
      {data && (
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
              <ProductInfo data={data} />
              <BuatPenawaranButton />
            </div>
          </div>

          <PelelangInfo />

          <div className="flex flex-col mt-4">
            <h3 className="text-xl font-bold">Daftar Penawaran</h3>
            <LelangTable data={productPenawaran} />
          </div>
        </div>
      )}
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

  const cValue = cookies.token.split("&");
  const [access_token, id, username] = cValue;
  return {
    props: {
      cookie: { access_token, id: Number(id), username },
    },
  };
};
