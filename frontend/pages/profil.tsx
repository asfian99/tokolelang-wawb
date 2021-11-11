import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React from "react";
import Head from "next/head";
import nookies from "nookies";
import LogoutButton from "../components/profil/LogoutButton";
import UserProfile from "../components/profil/UserProfile";
import { getAccountDetail } from "../lib/queries/accountQueries";
import { useQuery } from "react-query";
import Loading from "../components/pageStatus/Loading";

const Profil: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { cookie } = props;

  const { data, status } = useQuery("profile", () => getAccountDetail(cookie));

  return (
    <>
      <Head>
        <title>Profil - TokoLelang</title>
      </Head>

      <div>
        {status === "loading" && <Loading />}
        {status === "error" && <Loading />}
        {data && (
          <>
            <h2 className="mb-4 text-2xl font-semibold">Profil</h2>
            <UserProfile data={data} />
            <hr />
            <LogoutButton />
          </>
        )}
      </div>
    </>
  );
};

export default Profil;

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
