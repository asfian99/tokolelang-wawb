import React from "react";
import Image from "next/image";
import { rgbDataURL } from "../../lib/formatImage";
import type { AccountResponse } from "../../lib/queries/accountQueries";

interface UserProfileType extends AccountResponse {
  username: string;
}

interface UserProfileProps {
  data: UserProfileType;
}

const placeholderAvatar = "/uploads/avatar-default.png";

const UserProfile = ({ data }: UserProfileProps) => {
  return (
    <div className="flex flex-row justify-between mb-6">
      <div className="w-1/3 ">
        <Image
          className="border border-gray-300 rounded-xl"
          src={placeholderAvatar}
          alt="avatar"
          height="200"
          width="200"
          placeholder="blur"
          blurDataURL={rgbDataURL(220, 220, 220)}
        />
      </div>
      <div className="grid w-2/3 grid-cols-1 gap-y-8 md:grid-cols-2">
        <div>
          <h5 className="text-lg text-gray-600">First Name</h5>
          <h2 className="text-2xl font-bold">{data.first_name}</h2>
        </div>
        <div>
          <h5 className="text-lg text-gray-600">First Name</h5>
          <h2 className="text-2xl font-bold">{data.last_name}</h2>
        </div>
        <div>
          <h5 className="text-lg text-gray-600">Username</h5>
          <h2 className="text-2xl font-bold">{data.username}</h2>
        </div>
        <div>
          <h5 className="text-lg text-gray-600">Email</h5>
          <h2 className="text-2xl font-bold">{data.email}</h2>
        </div>
        <div>
          <h5 className="text-lg text-gray-600">User Status</h5>
          <h2 className="text-2xl font-bold">
            {data.is_master === 1 ? "Master" : "Member"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
