import React from "react";
import Link from "next/link";
import { parseCookies } from "nookies";
import type { AuthUserType } from "../../lib/contexts/userContext";
import LoginRegisterSection from "./navbar/LoginRegisterSection";
import UserInfo from "./navbar/UserInfo";

interface NavbarProps {
  user: AuthUserType;
}

const Navbar = ({ user }: NavbarProps) => {
  const cookies = parseCookies();

  return (
    <nav className="sticky top-0 z-10 grid items-center justify-between grid-cols-3 px-16 py-6 bg-white bg-opacity-75 border-b border-gray-300 backdrop-filter backdrop-blur-lg font-inter">
      <div>
        <Link href="/">
          <a className="mr-4 text-2xl font-bold text-primary">TokoLelang</a>
        </Link>
      </div>

      <div className="flex flex-row items-center justify-start gap-6 mx-auto">
        <Link href="/tentang-kami">
          <a className="font-semibold cursor-pointer text-text-l hover:text-text-d text-md">
            Fitur
          </a>
        </Link>
        <Link href="/tentang-kami">
          <a className="font-semibold cursor-pointer text-text-l hover:text-text-d text-md">
            Kontak
          </a>
        </Link>
        <Link href="/tentang-kami">
          <a className="font-semibold cursor-pointer text-text-l hover:text-text-d text-md">
            Tentang Kami
          </a>
        </Link>
      </div>

      <div className="flex flex-row items-center justify-end gap-8">
        {cookies.token && user.authenticated ? (
          <UserInfo userData={user.data} />
        ) : (
          <LoginRegisterSection />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
