import React from "react";
import MasterSidebar from "./sidebar/MasterSidebar";
import MemberSidebar from "./sidebar/MemberSidebar";
import type { AuthUserType } from "../../lib/contexts/userContext";

interface SidebarProps {
  user: AuthUserType;
}

const Sidebar = ({ user }: SidebarProps) => {
  return (
    <div className="fixed z-10 w-64 min-h-full overflow-x-hidden border-r border-gray-300 ">
      <div className="w-full px-6 py-8 ">
        <div className="grid grid-cols-1 gap-4">
          {user.data.is_master === 1 ? <MasterSidebar /> : <MemberSidebar />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
