import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

const sideMenu = [
  { slug: "lelang-terbuka", label: "Lelang Terbuka" },
  { slug: "riwayat", label: "Riwayat" },
  { slug: "notifikasi", label: "Notifikasi" },
  { slug: "profil", label: "Profil" },
];

const Sidebar = () => {
  const { pathname } = useRouter();
  // const {pathname} = router
  console.log(pathname);

  return (
    <div className="fixed z-10 w-64 min-h-full overflow-x-hidden border-r-2 border-gray-300 bg-gray-50">
      <div className="w-full px-6 py-8 ">
        <div className="grid grid-cols-1 gap-4">
          {sideMenu.map((menu) => (
            <Link href={`/${menu.slug}`} key={menu.slug}>
              <a
                className={clsx(
                  "w-full px-4 py-3 font-semibold text-left rounded-lg hover:bg-blue-50 hover:underline",
                  pathname === `/${menu.slug}`
                    ? "text-blue-500 bg-blue-50"
                    : "text-gray-700 "
                )}
              >
                {menu.label}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
