import React from "react";
import Link from "next/link";

const LoginRegisterSection = () => {
  return (
    <>
      <Link href="/register">
        <a className="px-6 py-2 font-bold text-blue-500 bg-blue-100 rounded-lg hover:bg-blue-200 ">
          Daftar
        </a>
      </Link>
      <Link href="/login">
        <a className="px-6 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 ">
          Masuk
        </a>
      </Link>
    </>
  );
};

export default LoginRegisterSection;
