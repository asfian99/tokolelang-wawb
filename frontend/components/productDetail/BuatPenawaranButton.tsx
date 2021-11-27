import clsx from "clsx";
import React, { useState } from "react";
import { formatRupiah } from "../../lib/formatCurrency";
import { PostItemResponse } from "../../lib/mutations/itemMutations";
import BuatPenawaranModal from "./BuatPenawaranModal";

interface BuatPenawaranButtonProps {
  data: PostItemResponse;
}

const BuatPenawaranButton = (props: BuatPenawaranButtonProps) => {
  const [isExpired, setIsExpired] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="flex flex-col items-start justify-start pr-8 mt-6">
        <button
          onClick={openModal}
          disabled={isExpired}
          className={clsx(
            isExpired ? "cursor-not-allowed" : "cursor-pointer",
            "w-1/2 py-3 font-bold text-white rounded-lg bg-primary disabled:bg-blue-300 hover:bg-blue-600 "
          )}
        >
          {isExpired ? "Penawaran Berakhir" : "Buat Penawaran"}
        </button>
        <p className="w-1/2 my-2 text-xs font-medium text-center ">
          Kelipatan {formatRupiah(props.data.bid_ratio)}
        </p>
      </div>

      <BuatPenawaranModal
        data={props.data}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default BuatPenawaranButton;
