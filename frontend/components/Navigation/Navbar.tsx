import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="sticky top-0 grid items-center justify-between grid-cols-3 px-16 py-6 font-sans bg-white border-b-2 border-gray-300">
        <div className="flex flex-row items-center justify-start gap-4">
          <Link href="/">
            <a className="mr-4 text-2xl font-bold text-blue-500">TokoLelang</a>
          </Link>
          {/* <h3 className="font-semibold text-gray-500 cursor-pointer hover:underline text-md">
            Lelang Terbuka
          </h3> */}
          <h3 className="font-semibold text-gray-500 cursor-pointer hover:underline text-md">
            Tentang Kami
          </h3>
        </div>
        <div className="justify-center mx-auto">
          <input
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg "
            type="text"
            name="search"
            id="search"
            placeholder="Search"
          />
        </div>
        <div className="flex flex-row items-center justify-end gap-8">
          <Link href="/signup">
            <a className="px-6 py-2 font-bold text-blue-500 bg-blue-100 rounded-lg hover:bg-blue-200 ">
              Daftar
            </a>
          </Link>
          <Link href="/login">
            <a className="px-6 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 ">
              Masuk
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
