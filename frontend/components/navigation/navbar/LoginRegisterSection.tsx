import React from "react";
import Link from "next/link";

const LoginRegisterSection = () => {
  return (
    <>
      <Link href="/register">
        <a className="px-8 font-bold btn-secondary">Daftar</a>
      </Link>
      <Link href="/login">
        <a className="px-8 font-bold btn-primary">Masuk</a>
      </Link>
    </>
  );
};

export default LoginRegisterSection;
