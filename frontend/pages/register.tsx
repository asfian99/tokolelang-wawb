import React, { useState } from "react";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import Head from "next/head";
import RegForms from "../components/register/RegForms";
import RegSuccess from "../components/register/RegSuccess";

const Register = () => {
  const [reqStatus, setReqStatus] = useState({
    loading: false,
    error: false,
    success: false,
  });

  return (
    <>
      <Head>
        <title>Daftar - TokoLelang</title>
      </Head>

      <div className="flex flex-row items-center justify-center min-h-[80vh]">
        <div className="w-4/5 px-12 py-12 border-2 border-gray-300 rounded-lg md:w-2/4">
          <h2 className="mb-4 text-2xl font-bold">
            {reqStatus.success ? "Selamat" : "Daftar"}
          </h2>

          {reqStatus.success ? (
            <RegSuccess />
          ) : (
            <RegForms req={{ reqStatus, setReqStatus }} />
          )}
        </div>
      </div>
    </>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);

  if (cookies.token && cookies.token.length > 25) {
    return {
      redirect: {
        destination: "/lelang-terbuka",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
