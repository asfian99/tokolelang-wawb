import React from "react";

import type { AccountResponse } from "../../lib/queries/accountQueries";
import UserProfileEdit from "./UserProfileEdit";
import UserProfileView from "./UserProfileView";

interface UserProfileProps {
  data: AccountResponse;
  modal: { isOpen: boolean; closeModal: () => void };
}

const UserProfile = ({ data, modal }: UserProfileProps) => {
  return (
    <>
      <div className="flex flex-row justify-between mb-6">
        <UserProfileView data={data} />
      </div>

      <UserProfileEdit modal={modal} />
    </>
  );
};

export default UserProfile;
