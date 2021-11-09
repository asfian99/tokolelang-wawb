import React from "react";
import Link from "next/link";
import type { AuthUserType } from "../../lib/contexts/userContext";
import LoginRegisterSection from "./navbar/LoginRegisterSection";
import UserInfo from "./navbar/UserInfo";

interface NavbarProps {
  user: AuthUserType;
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <>
      <div className="sticky top-0 z-10 grid items-center justify-between grid-cols-3 px-16 py-6 font-sans bg-white border-b-2 border-gray-300">
        <div className="flex flex-row items-center justify-start gap-4">
          <Link href="/">
            <a className="mr-4 text-2xl font-bold text-blue-500">TokoLelang</a>
          </Link>
          <h3 className="font-semibold text-gray-500 cursor-pointer hover:underline text-md">
            Tentang Kami
          </h3>
        </div>
        <div className="justify-center mx-auto">
          <input
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg "
            type="text"
            name="search"
            id="search"
            placeholder="Search"
          />
        </div>
        <div className="flex flex-row items-center justify-end gap-8">
          {user.authenticated ? (
            <UserInfo userData={user.data} />
          ) : (
            <LoginRegisterSection />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
