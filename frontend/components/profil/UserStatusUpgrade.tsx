import clsx from "clsx";
import React, { useState } from "react";
import { AccountResponse } from "../../lib/queries/accountQueries";
import ConfirmUserStatusUpgrade from "./ConfirmUserStatusUpgrade";

interface UserStatusUpgradeProps {
  data: AccountResponse;
}

const UserStatusUpgrade = ({ data }: UserStatusUpgradeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <p className={clsx("text-gray-600", data.is_master && "invisible")}>
        Ingin membuka pelelangan?{" "}
        <span
          onClick={openModal}
          className="cursor-pointer text-primary hover:text-primary-d"
        >
          Upgrade ke User Master
        </span>
      </p>

      <ConfirmUserStatusUpgrade data={data} modal={{ isOpen, closeModal }} />
    </>
  );
};

export default UserStatusUpgrade;
