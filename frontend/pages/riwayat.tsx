import { GetServerSideProps, NextPage } from "next";
import nookies from "nookies";

import React from "react";

const Riwayat: NextPage = () => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Riwayat</h2>
    </div>
  );
};

export default Riwayat;

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
