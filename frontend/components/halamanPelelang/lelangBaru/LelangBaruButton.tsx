import { PlusIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import LelangBaruModal from "./LelangBaruModal";

const LelangBaruButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button onClick={openModal} className="text-sm btn-primary_icon">
        <PlusIcon className="w-4 h-4 mr-2 font-bold" />
        <span> Lelang Baru</span>
      </button>

      <LelangBaruModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default LelangBaruButton;
