import { GetServerSideProps, NextPage } from "next";
import React from "react";
import nookies from "nookies";

const Notifikasi: NextPage = () => {
  return (
    <div>
      <p>Notifikasi</p>
    </div>
  );
};

export default Notifikasi;

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

  return {
    props: {},
  };
};
