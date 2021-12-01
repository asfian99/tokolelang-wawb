import clsx from "clsx";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { userContext } from "../../lib/contexts/userContext";
import { formatRupiah } from "../../lib/formatCurrency";
import { ItemResponse } from "../../lib/mutations/itemMutations";
import BuatPenawaranModal from "./BuatPenawaranModal";
import { formatSlug } from "../../lib/formatString";
import { getTimeStamp } from "../../lib/formatDateTime";

interface BuatPenawaranButtonProps {
  data: ItemResponse;
}

const BuatPenawaranButton = (props: BuatPenawaranButtonProps) => {
  const { user } = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // console.log({ user });
  // console.log(props.data);

  return (
    <>
      <div className="flex flex-col items-start justify-start pr-8 mt-6">
        {user.data.id === props.data.account_id ? (
          <Link
            href={`/halaman-pelelang/${formatSlug(
              props.data.name,
              props.data.id
            )}`}
          >
            <a className="w-1/2 py-3 font-bold btn-secondary">Edit Lelang</a>
          </Link>
        ) : (
          <>
            <button
              onClick={openModal}
              disabled={props.data.closing_time < getTimeStamp()}
              className={clsx(
                props.data.closing_time < getTimeStamp()
                  ? "cursor-not-allowed"
                  : "cursor-pointer",
                "w-1/2 py-3 font-bold btn-primary "
              )}
            >
              {props.data.closing_time < getTimeStamp()
                ? "Penawaran Berakhir"
                : "Buat Penawaran"}
            </button>
            <p className="w-1/2 my-2 text-xs font-medium text-center ">
              Kelipatan {formatRupiah(props.data.bid_ratio)}
            </p>
          </>
        )}
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
