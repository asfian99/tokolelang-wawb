import React from "react";

const BuatPenawaranButton = () => {
  return (
    <div className="flex flex-col items-start justify-start pr-8 mt-6">
      <button
        // onClick={onLogout}
        // disabled={reqStatus.loading}
        className="w-1/2 py-3 font-bold text-white rounded-lg bg-primary disabled:bg-blue-300 hover:bg-blue-600 "
      >
        {"Buat Penawaran"}
      </button>
      <p className="w-1/2 my-2 text-xs font-medium text-center ">
        Kelipatan Rp100.000
      </p>
    </div>
  );
};

export default BuatPenawaranButton;
