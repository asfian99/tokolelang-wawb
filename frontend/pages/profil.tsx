import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React, { useState } from "react";
import Head from "next/head";
import nookies from "nookies";
import { useQuery } from "react-query";
import { PencilAltIcon } from "@heroicons/react/outline";
import LogoutButton from "../components/profil/LogoutButton";
import UserProfile from "../components/profil/UserProfile";
import { getAccountDetail } from "../lib/queries/accountQueries";
import Loading from "../components/pageStatus/Loading";
import RequestFailed from "../components/pageStatus/RequestFailed";
import UserStatusUpgrade from "../components/profil/UserStatusUpgrade";

const Profil: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { cookie } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useQuery(`profile_${cookie.username}`, () =>
    getAccountDetail(cookie)
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Head>
        <title>Profil - TokoLelang</title>
      </Head>

      <div>
        {status === "loading" && <Loading />}
        {status === "error" && <RequestFailed />}
        {data && (
          <>
            <div className="flex flex-row items-center gap-4 mb-4">
              <h2 className="text-2xl font-semibold">Profil</h2>

              <PencilAltIcon
                className="w-6 h-6 cursor-pointer text-primary hover:text-primary-d"
                onClick={openModal}
              />
            </div>

            <UserProfile modal={{ isOpen, closeModal }} data={data} />
            <hr />
            <div className="flex flex-row items-center justify-between mt-6">
              <UserStatusUpgrade data={data} />
              <LogoutButton />
            </div>
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
