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
import { getItems } from "../../lib/queries/itemQueries";
import Loading from "../../components/pageStatus/Loading";
import { AxiosError } from "axios";
import { PostItemResponse } from "../../lib/mutations/itemMutations";

const LelangTerbuka: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { cookie } = props;

  const { data, status } = useQuery<PostItemResponse[], AxiosError>(
    "items",
    () => getItems(cookie)
  );

  return (
    <>
      <Head>
        <title>Lelang Terbuka - TokoLelang</title>
      </Head>

      {status === "loading" && <Loading />}
      {status === "error" && <Loading />}
      {data && (
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Lelang Terbuka</h2>

          <Products data={data} />
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
