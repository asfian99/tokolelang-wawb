import { GetServerSideProps, NextPage } from "next";
import nookies from "nookies";
import React from "react";
import LogoutButton from "../components/profil/LogoutButton";

const Profil: NextPage = () => {
  return (
    <div>
      <p>Profil</p>
      <hr />
      <LogoutButton />
    </div>
  );
};

export default Profil;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);

  if (!cookies.token) {
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
