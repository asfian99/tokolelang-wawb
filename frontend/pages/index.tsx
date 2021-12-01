import type { NextPage } from "next";
import React from "react";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Landing Page - TokoLelang</title>
      </Head>
      <div className="grid grid-cols-1 gap-8 mx-32 my-12">
        {/* Section 1 */}
        <section className="grid items-center text-text-d min-h-[72vh] grid-cols-2 gap-10 pb-16">
          <div>
            <h1 className="mb-6 text-5xl font-bold">
              Selamat Datang di TokoLelang
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              voluptate neque facilis iste exercitationem ullam tempora labore
              voluptatibus quaerat eos provident expedita, corporis nisi,
              pariatur in quidem consequuntur dolorem id! Consequatur
              consectetur nesciunt quo voluptatibus. Quis accusamus odio
              consectetur deserunt minima dolor asperiores dicta, rerum tempore,
              facere magnam eaque neque.
            </p>
          </div>
          <div></div>
        </section>

        {/* Section 2 */}
        <section className="grid items-center grid-cols-2 gap-10 px-8 py-16 text-cream rounded-xl bg-primary">
          <div></div>
          <div className="flex flex-col gap-6">
            <h1 className="mb-6 text-5xl font-bold">
              Cari Barang Dengan Harga Terbaik
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              voluptate neque facilis iste exercitationem ullam tempora labore
              voluptatibus quaerat eos provident expedita, corporis nisi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              voluptate neque facilis iste exercitationem ullam tempora labore
              voluptatibus quaerat eos provident expedita, corporis nisi.
            </p>
          </div>
        </section>

        <section className="grid items-center grid-cols-2 gap-10 px-8 py-16 text-text-d rounded-xl">
          <div className="flex flex-col gap-6">
            <h1 className="mb-6 text-5xl font-bold">
              Buka Pelelangan, Penawaran Datang
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              voluptate neque facilis iste exercitationem ullam tempora labore
              voluptatibus quaerat eos provident expedita, corporis nisi.
            </p>
          </div>
          <div></div>
        </section>
      </div>
    </>
  );
};

export default Home;
