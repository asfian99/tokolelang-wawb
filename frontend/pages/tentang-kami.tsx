import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const TentangKami: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tentang Kami - TokoLelang</title>
      </Head>

      <div className="mx-32 my-12">
        <h1 className="mb-6 text-5xl font-bold text-center">Tentang Kami</h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
          voluptate neque facilis iste exercitationem ullam tempora labore
          voluptatibus quaerat eos provident expedita, corporis nisi, pariatur
          in quidem consequuntur dolorem id! Consequatur consectetur nesciunt
          quo voluptatibus. Quis accusamus odio consectetur deserunt minima
          dolor asperiores dicta, rerum tempore, facere magnam eaque neque.
        </p>
        <br />
      </div>
    </>
  );
};

export default TentangKami;
