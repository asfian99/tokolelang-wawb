import type { NextPage } from "next";
import React from "react";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Landing Page - TokoLelang</title>
      </Head>
      <div className="mx-32 my-12">
        <h1 className="mb-6 text-5xl font-bold text-center">
          Selamat Datang di TokoLelang
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
          voluptate neque facilis iste exercitationem ullam tempora labore
          voluptatibus quaerat eos provident expedita, corporis nisi, pariatur
          in quidem consequuntur dolorem id! Consequatur consectetur nesciunt
          quo voluptatibus. Quis accusamus odio consectetur deserunt minima
          dolor asperiores dicta, rerum tempore, facere magnam eaque neque.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
          voluptate neque facilis iste exercitationem ullam tempora labore
          voluptatibus quaerat eos provident expedita, corporis nisi, pariatur
          in quidem consequuntur dolorem id! Consequatur consectetur nesciunt
          quo voluptatibus. Quis accusamus odio consectetur deserunt minima
          dolor asperiores dicta, rerum tempore, facere magnam eaque neque.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
          voluptate neque facilis iste exercitationem ullam tempora labore
          voluptatibus quaerat eos provident expedita, corporis nisi, pariatur
          in quidem consequuntur dolorem id! Consequatur consectetur nesciunt
          quo voluptatibus. Quis accusamus odio consectetur deserunt minima
          dolor asperiores dicta, rerum tempore, facere magnam eaque neque.
        </p>
      </div>
    </>
  );
};

export default Home;
