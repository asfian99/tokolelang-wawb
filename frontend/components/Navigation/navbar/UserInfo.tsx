import React from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "../../../assets/avatar-default.png";
import type { UserType } from "../../../lib/contexts/userContext";

interface UserInfoProps {
  userData: UserType;
}

const UserInfo = ({ userData }: UserInfoProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-6 divide-x-2 divide-gray-500">
      <div className="flex flex-col justify-end ">
        <Link href="/profil">
          <a className="text-xl font-bold text-right text-gray-700 hover:text-gray-500">
            {userData.username}
          </a>
        </Link>
        <p className="text-sm text-right text-gray-500">
          {userData.is_master ? "Master" : "Member"}
        </p>
      </div>

      <div className="flex items-center justify-end w-full h-full py-0 pl-6">
        <Image
          className="border border-gray-300 rounded-full"
          src={Avatar}
          alt="avatar"
          height="45"
          width="45"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default UserInfo;
