import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import React, { useState } from "react";
import nookies from "nookies";
import Image from "next/image";
import ProductInfo from "../../components/productDetail/ProductInfo";
import BuatPenawaranButton from "../../components/productDetail/BuatPenawaranButton";
import LelangTable from "../../components/productDetail/LelangTable";
import PelelangInfo from "../../components/productDetail/PelelangInfo";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { ItemResponse } from "../../lib/mutations/itemMutations";
import { AxiosError } from "axios";
import { ImageResponse } from "../../lib/mutations/imageMutations";
import { getItemDetail } from "../../lib/queries/itemQueries";
import { getItemImages } from "../../lib/queries/imageQueries";
import { rgbDataURL } from "../../lib/formatImage";
import Loading from "../../components/pageStatus/Loading";
import { TransactionItemResponse } from "../../lib/mutations/transactionMutations";
import { getTransactionsOnItem } from "../../lib/queries/transactionQueries";
import { PencilAltIcon } from "@heroicons/react/outline";
import RequestFailed from "../../components/pageStatus/RequestFailed";
import LelangDetailView from "../../components/halamanPelelang/lelangDetail/LelangDetailView";
import LelangDetailEdit from "../../components/halamanPelelang/lelangDetail/LelangDetailEdit";
import { IMAGE_URL } from "../../lib/url";

export interface PenawaranInterface {
  id: number;
  username: string;
  datetime: string;
  bid: string;
}

const placeholderImg = "/uploads/item_placeholder.png";

const ProductDilelangkanDetail: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { slug } = useRouter().query;
  const { cookie } = props;
  const [isEdit, setIsEdit] = useState(false);

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

  const toggleEdit = () => setIsEdit(!isEdit);
  const img = image.data ? IMAGE_URL + "/w_600" + image.data.link : "";

  return (
    <>
      <Head>
        <title>[Ditutup] Lorem ipsum dolor sit amet. - TokoLelang</title>
      </Head>

      <div>
        <div className="flex flex-row items-center gap-4 mb-4">
          <h2 className="text-2xl font-semibold ">Product Detail</h2>
          {!isEdit && (
            <PencilAltIcon
              className="w-6 h-6 cursor-pointer text-primary hover:text-primary-d"
              onClick={toggleEdit}
            />
          )}
        </div>

        {item.status === "loading" && <Loading />}
        {item.status === "error" && <RequestFailed />}
        {item.data && (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col justify-between">
              {isEdit ? (
                <LelangDetailEdit data={item.data} toggleEdit={toggleEdit} />
              ) : (
                <LelangDetailView data={item.data} />
              )}
            </div>

            <div className="transition duration-150 ease-in-out border border-gray-300 hover:shadow-md rounded-2xl">
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
          </div>
        )}

        {transactions.status === "loading" && <Loading />}
        {transactions.status === "error" && <RequestFailed />}
        {transactions.data && (
          <div className="flex flex-col mt-4">
            <h3 className="text-xl font-bold">Daftar Penawaran</h3>
            <LelangTable data={transactions.data} />
          </div>
        )}
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

  const cValue = cookies.token.split("&");
  const [access_token, id, username] = cValue;
  return {
    props: {
      cookie: { access_token, id: Number(id), username },
    },
  };
};
