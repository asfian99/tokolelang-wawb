import { GetServerSideProps, NextPage } from "next";
import React from "react";
import nookies from "nookies";
import Image from "next/image";
import PlaceholderImg from "../../assets/placeholder-img.png";

const ProductDetail = () => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Product Detail</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="my-4 mr-2">
          <Image
            className="border border-gray-300 cursor-pointer rounded-2xl"
            src={PlaceholderImg}
            alt="placeholderImageDetail"
            height="400"
            width="540"
            objectFit="cover"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="mt-4 text-3xl font-bold cursor-pointer group-hover:text-black hover:underline">
            Lorem ipsum dolor sit amet.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

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
