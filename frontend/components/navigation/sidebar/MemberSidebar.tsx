import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";
import {
  ShoppingCartIcon,
  ClipboardListIcon,
  BellIcon,
  UserIcon,
} from "@heroicons/react/outline";

const sideMenu = [
  {
    slug: "lelang-terbuka",
    label: "Lelang Terbuka",
    icon: <ShoppingCartIcon className="w-5 h-5" />,
  },
  {
    slug: "riwayat",
    label: "Riwayat",
    icon: <ClipboardListIcon className="w-5 h-5" />,
  },
  {
    slug: "notifikasi",
    label: "Notifikasi",
    icon: <BellIcon className="w-5 h-5" />,
  },
  {
    slug: "profil",
    label: "Profil",
    icon: <UserIcon className="w-5 h-5" />,
  },
];

const MemberSidebar = () => {
  const { pathname } = useRouter();
  const [, pageSlug] = pathname.split("/");

  return (
    <>
      {sideMenu.map((menu) => (
        <Link href={`/${menu.slug}`} key={menu.slug}>
          <a
            className={clsx(
              "w-full px-4 py-3 transition duration-150 ease-in font-semibold flex flex-row items-center gap-2 text-left rounded-xl hover:bg-primary-l2 ",
              pageSlug === menu.slug
                ? "text-primary-d bg-primary-l2"
                : "text-gray-700 "
            )}
          >
            {menu.icon} <span>{menu.label}</span>
          </a>
        </Link>
      ))}
    </>
  );
};

export default MemberSidebar;
