import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import React, { useContext } from "react";
import nookies from "nookies";
import Image from "next/image";
import ProductInfo from "../../components/productDetail/ProductInfo";
import BuatPenawaranButton from "../../components/productDetail/BuatPenawaranButton";
import PelelangInfo from "../../components/productDetail/PelelangInfo";
import LelangTable from "../../components/productDetail/LelangTable";
import { useQuery } from "react-query";
import { ItemResponse } from "../../lib/mutations/itemMutations";
import { AxiosError } from "axios";
import { getItemDetail } from "../../lib/queries/itemQueries";
import Loading from "../../components/pageStatus/Loading";
import { ImageResponse } from "../../lib/mutations/imageMutations";
import { getItemImages } from "../../lib/queries/imageQueries";
import { IMAGE_URL } from "../../lib/url";
import { rgbDataURL } from "../../lib/formatImage";
import { TransactionItemResponse } from "../../lib/mutations/transactionMutations";
import { getTransactionsOnItem } from "../../lib/queries/transactionQueries";

export interface PenawaranInterface {
  id: number;
  username: string;
  datetime: string;
  bid: string;
}

const placeholderImg = "/uploads/item_placeholder.png";

const ProductDetail: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { slug } = useRouter().query;
  const { cookie } = props;

  const item = useQuery<ItemResponse, AxiosError>(`item_${slug}`, () =>
    getItemDetail(cookie, slug)
  );
  const image = useQuery<ImageResponse, AxiosError>(`image_${slug}`, () =>
    getItemImages(cookie, slug)
  );
  const transactions = useQuery<TransactionItemResponse[], AxiosError>(
    `transaction_${slug}`,
    () => getTransactionsOnItem(cookie, slug)
  );

  const img = image.data ? IMAGE_URL + "/w_600" + image.data.link : "";
  return (
    <>
      <Head>
        <title>{item.data && item.data.name + " -"} TokoLelang</title>
      </Head>
      {item.status === "loading" && <Loading />}
      {item.status === "error" && <Loading />}
      {item.data && (
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Product Detail</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="my-4 mr-2 transition duration-150 ease-in-out border border-gray-300 hover:shadow-md rounded-2xl">
              <Image
                className="border border-gray-300 cursor-pointer rounded-2xl"
                src={image.data ? img : placeholderImg}
                alt="placeholderImageDetail"
                height="400"
                width="540"
                objectFit="cover"
                layout="responsive"
                placeholder="blur"
                blurDataURL={rgbDataURL(220, 220, 220)}
              />
            </div>

            <div className="flex flex-col pr-8 mb-4">
              <ProductInfo data={item.data} transactions={transactions.data} />
              <BuatPenawaranButton data={item.data} />
            </div>
          </div>

          <PelelangInfo />

          {transactions.status === "loading" && <Loading />}
          {transactions.status === "error" && <Loading />}
          {transactions.data && (
            <div className="flex flex-col mt-4">
              <h3 className="text-xl font-bold">Daftar Penawaran</h3>
              <LelangTable data={transactions.data} />
            </div>
          )}
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
