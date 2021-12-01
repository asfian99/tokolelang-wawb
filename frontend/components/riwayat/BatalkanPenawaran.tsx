import clsx from "clsx";
import React, { useState } from "react";
import { getTimeStamp } from "../../lib/formatDateTime";
import { TransactionUserResponse } from "../../lib/mutations/transactionMutations";
import BatalkanPenawaranModal from "./BatalkanPenawaranModal";

interface BatalkanPenawaranProps {
  data: TransactionUserResponse;
}

const BatalkanPenawaran = ({ data }: BatalkanPenawaranProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const getIsEnabled = () => {
    if (data.closing_time > getTimeStamp()) return true;
    else return false;
  };

  return (
    <>
      <span
        onClick={() => getIsEnabled() && openModal()}
        className={clsx(
          getIsEnabled()
            ? "cursor-pointer text-danger hover:text-danger-d hover:underline"
            : "invisible"
        )}
      >
        Batal
      </span>

      <BatalkanPenawaranModal
        data={data}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default BatalkanPenawaran;
