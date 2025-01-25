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
    <section className="absolute z-10 w-full px-3 py-4 mt-5 bg-secondaryColor sm:rounded-xl sm:py-5 sm:px-0 sm:fixed sm:w-48 sm:h-screen">
      <div
        className={`flex items-center gap-x-2 ${
          showMenu ? "mb-4" : "mb-0"
        } px-3 cursor-pointer sm:mb-10 sm:pointer-events-none`}
        onClick={toggleMenu}
      >
        <span className="font-bold text-md">Mi cuenta</span>
        <ChevronIcon className={`size-3 sm:hidden transition-transform duration-700 ease-linear ${showMenu ? "rotate-90" : " rotate-0"}`} />
      </div>
      <nav
        className={`${
          showMenu ? "inline-block" : "hidden"
        } sm:inline-block sm:w-full`}
      >
        <ul className="flex flex-col w-full gap-y-8">
          {menuItems.map(({ url, label, Icon }, index) => (
            <li key={label} className="flex px-3 group sm:px-0">
              <span className="hidden w-1 mr-2 sm:block group-hover:bg-primaryColor"></span>
              <Link href={url} className="flex items-center gap-x-3">
                <Icon className={`size-7 ${pathname === url ? "text-gray-900" : "text-gray-600"}`} />
                <span className={`text-sm ${pathname === url ? "font-bold" : "font-normal"}`}>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export default ProfileNav;
