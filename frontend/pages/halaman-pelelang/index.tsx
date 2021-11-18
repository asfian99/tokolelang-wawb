import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import nookies from "nookies";
import LelangBaruButton from "../../components/halamanPelelang/lelangBaru/LelangBaruButton";
import DilelangkanTable from "../../components/halamanPelelang/DilelangkanTable";
import { uploadImage } from "../../lib/mutations/imageMutations";

export interface DilelangkanInterface {
  id: number;
  name: string;
  description: string;
  open_bid: number;
  closing_time: number;
  fundraising: number;
  user_id: number;
  location: string;
  event: string;
  created_at: number;
  updated_at: number;
}

const data = [
  {
    id: 1,
    name: "Paseo Tissue",
    description:
      "During the course of developing and maintaining a database-driven application, the structure of the database being used evolves just like the source code does.",
    open_bid: 7500000,
    closing_time: 1633593240000,
    fundraising: 0,
    user_id: 1,
    location: "Surabaya",
    event: "",
    created_at: 1636353342,
    updated_at: 1636353342,
  },
  {
    id: 2,
    name: "Paseo Tissue 2",
    description:
      "During the course of developing and maintaining a database-driven application, the structure of the database being used evolves just like the source code does.",
    open_bid: 800000,
    closing_time: 1633593240000,
    fundraising: 1,
    user_id: 1,
    location: "Surabaya",
    event: "",
    created_at: 1636353342,
    updated_at: 1636353342,
  },
  {
    id: 3,
    name: "Paseo Tissue 3",
    description:
      "During the course of developing and maintaining a database-driven application, the structure of the database being used evolves just like the source code does.",
    open_bid: 3500000,
    closing_time: 1633593240000,
    fundraising: 1,
    user_id: 1,
    location: "Surabaya",
    event: "",
    created_at: 1636353342,
    updated_at: 1636353342,
  },
  {
    id: 4,
    name: "Paseo Tissue 4",
    description:
      "During the course of developing and maintaining a database-driven application, the structure of the database being used evolves just like the source code does.",
    open_bid: 2000000,
    closing_time: 1633593240000,
    fundraising: 0,
    user_id: 1,
    location: "Surabaya",
    event: "",
    created_at: 1636353342,
    updated_at: 1636353342,
  },
];

const HalamanPelelang: NextPage = () => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const [res, setRes] = useState("");

  const onChange = async (formData: FormData) => {
    const res = await uploadImage(formData);
    console.log("response", res.data);
    setRes(res.data.path);
  };

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    onChange(formData);

    formRef.current?.reset();
  };

  return (
    <>
      <Head>
        <title>Halaman Pelelang - TokoLelang</title>
      </Head>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Halaman Pelelang</h2>

        <div className="flex flex-row items-center justify-between">
          <h3 className="mr-8 text-xl font-semibold ">
            Daftar Barang Dilelangkan
          </h3>
          <LelangBaruButton />
        </div>

        <div className="flex flex-col mt-4">
          <DilelangkanTable data={data} />
        </div>

        <div className="my-8">
          <form>
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="item_image"
              onClick={onClickHandler}
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-transparent"
              aria-describedby="item_image_help"
              name="itemImage"
              id="item_image"
              type="file"
              onChange={onChangeHandler}
              ref={fileInputRef}
            />
            <div className="mt-1 text-sm text-gray-500" id="item_image_help">
              Upload gambar barang disini
            </div>
          </form>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        {res && <Image src={res} alt="me" width="200" height="200" />}
      </div>
    </>
  );
};

export default HalamanPelelang;

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
