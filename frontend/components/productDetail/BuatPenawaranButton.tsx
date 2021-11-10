import React, { useState } from "react";
import BuatPenawaranModal from "./BuatPenawaranModal";

const BuatPenawaranButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="flex flex-col items-start justify-start pr-8 mt-6">
        <button
          onClick={openModal}
          className="w-1/2 py-3 font-bold text-white rounded-lg bg-primary disabled:bg-blue-300 hover:bg-blue-600 "
        >
          {"Buat Penawaran"}
        </button>
        <p className="w-1/2 my-2 text-xs font-medium text-center ">
          Kelipatan Rp100.000
        </p>
      </div>

      <BuatPenawaranModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default BuatPenawaranButton;
