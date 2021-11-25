import { useRouter } from "next/router";
import React from "react";

const RegSuccess = () => {
  const router = useRouter();

  const onClick = () => {
    router.replace("/lelang-terbuka");
  };

  return (
    <div className="-my-2">
      <h2>Akun anda telah berhasil dibuat!</h2>
      <button
        onClick={onClick}
        className="px-8 py-2 mt-8 font-bold text-white bg-blue-500 rounded-lg disabled:bg-blue-300 hover:bg-blue-600 "
      >
        Lihat Lelang Terbuka
      </button>
    </div>
  );
};

export default RegSuccess;
