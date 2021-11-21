import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import React from "react";
import nookies from "nookies";
import Image from "next/image";
import ProductInfo from "../../components/productDetail/ProductInfo";
import BuatPenawaranButton from "../../components/productDetail/BuatPenawaranButton";
import LelangTable from "../../components/productDetail/LelangTable";
import PelelangInfo from "../../components/productDetail/PelelangInfo";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { PostItemResponse } from "../../lib/mutations/itemMutations";
import { AxiosError } from "axios";
import { PostImageResponse } from "../../lib/mutations/imageMutations";
import { getItemDetail } from "../../lib/queries/itemQueries";
import { getItemImages } from "../../lib/queries/imageQueries";
import { rgbDataURL } from "../../lib/formatImage";
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

const placeholderImg = "/uploads/item_placeholder.png";

const ProductDilelangkanDetail: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { query } = useRouter();
  const { cookie } = props;
  const { slug } = query;

  const item = useQuery<PostItemResponse, AxiosError>(`item_${slug}`, () =>
    getItemDetail(cookie, slug)
  );
  const image = useQuery<PostImageResponse, AxiosError>(`image_${slug}`, () =>
    getItemImages(cookie, slug)
  );

  return (
    <>
      <Head>
        <title>[Ditutup] Lorem ipsum dolor sit amet. - TokoLelang</title>
      </Head>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Product Detail</h2>

        {item.status === "loading" && <Loading />}
        {item.status === "error" && <Loading />}
        {item.data && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex flex-col mt-4">
                <label className="text-xs font-bold uppercase">
                  Nama Barang
                </label>
                <h5 className="text-xl ">{item.data.name}</h5>
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-xs font-bold uppercase">
                  Deskripsi Barang
                </label>
                <h5 className="text-base">{item.data.description}</h5>
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-xs font-bold uppercase">
                  Nama Barang
                </label>
                <h5 className="text-xl ">{item.data.name}</h5>
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-xs font-bold uppercase">
                  Nama Barang
                </label>
                <h5 className="text-xl ">{item.data.name}</h5>
              </div>
            </div>

            <div>
              <Image
                className="border border-gray-300 cursor-pointer rounded-2xl"
                src={placeholderImg}
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
