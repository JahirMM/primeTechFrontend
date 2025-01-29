"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import BagShoppingIcon from "@/icons/BagShoppingIcon";
import UserCircleIcon from "@/icons/UserCircleIcon";
import ChevronIcon from "@/icons/ChevronIcon";
import SaleIcon from "@/icons/SaleIcon";
import BoxIcon from "@/icons/BoxIcon";

const menuItems = [
  { url: "/profile", label: "Mi perfil", Icon: UserCircleIcon },
  { url: "/profile/purchases", label: "Compras", Icon: BagShoppingIcon },
  { url: "/profile/sales", label: "Ventas", Icon: SaleIcon },
  { url: "/profile/my-products", label: "Mis productos", Icon: BoxIcon },
];

function ProfileNav() {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  return (
    <section className="absolute z-10 w-full px-3 py-4 top-14 bg-secondaryColor sm:rounded-xl sm:py-5 sm:mt-5 sm:px-0 sm:fixed sm:w-48 sm:h-screen">
      <div
        className="flex items-center px-3 cursor-pointer gap-x-2 sm:mb-10 sm:pointer-events-none"
        onClick={toggleMenu}
      >
        <span className="text-sm font-bold">Mi cuenta</span>
        <ChevronIcon
          className={`size-3 sm:hidden transition-transform duration-700 ease-linear ${
            showMenu ? "rotate-90" : " rotate-0"
          }`}
        />
      </div>
      <nav
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showMenu ? "mt-4 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          } sm:max-h-none sm:opacity-100`}
      >
        <ul className="flex flex-col w-full gap-y-8">
          {menuItems.map(({ url, label, Icon }) => (
            <li
              key={label}
              className="flex px-3 group sm:px-0"
            >
              <span className="hidden w-1 mr-2 sm:block group-hover:bg-primaryColor"></span>
              <Link
                href={url}
                className="flex items-center gap-x-3"
                onClick={() => setShowMenu(false)}
              >
                <Icon
                  className={`size-7 ${
                    pathname === url ? "text-gray-900" : "text-gray-600"
                  }`}
                />
                <span
                  className={`text-sm ${
                    pathname === url ? "font-bold" : "font-normal"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export default ProfileNav;
