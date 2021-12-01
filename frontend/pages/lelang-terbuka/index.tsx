import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React from "react";
import nookies from "nookies";
import Products from "../../components/lelangTerbuka/Products";
import Head from "next/head";
import { useQuery } from "react-query";
import { getItems, getItemsWithTrans } from "../../lib/queries/itemQueries";
import Loading from "../../components/pageStatus/Loading";
import { AxiosError } from "axios";
import { ItemResponseWithTrans } from "../../lib/mutations/itemMutations";
import { ImageResponse } from "../../lib/mutations/imageMutations";
import { getImages } from "../../lib/queries/imageQueries";
import RequestFailed from "../../components/pageStatus/RequestFailed";

const LelangTerbuka: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { cookie } = props;

  const items = useQuery<ItemResponseWithTrans[], AxiosError>("items", () =>
    getItemsWithTrans(cookie)
  );
  const images = useQuery<ImageResponse[], AxiosError>("images", () =>
    getImages(cookie)
  );

  return (
    <>
      <Head>
        <title>Lelang Terbuka - TokoLelang</title>
      </Head>

      {items.status === "loading" && <Loading />}
      {items.status === "error" && <RequestFailed />}
      {items.data && images.data && (
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Lelang Terbuka</h2>

          <Products data={items.data} images={images.data} />
        </div>
      )}
    </>
  );
};

export default LelangTerbuka;

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
