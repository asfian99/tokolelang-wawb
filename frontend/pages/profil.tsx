import { GetServerSideProps, NextPage } from "next";
import nookies from "nookies";
import React from "react";

const Profil: NextPage = () => {
  return (
    <div>
      <p>Profil</p>
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
