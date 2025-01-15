"use client";

import { useState } from "react";
import Link from "next/link";

import CartShoppingIcon from "@/icons/CartShoppingIcon";
import HeartIcon from "@/icons/HeartIcon";
import XmarkIcon from "@/icons/XmarkIcon";
import BoxesIcon from "@/icons/BoxesIcon";
import MenuIcon from "@/icons/MenuIcon";
import HomeIcon from "@/icons/HomeIcon";
import UserIcon from "@/icons/UserIcon";

const navItems = [
  {
    label: "Inicio",
    icon: <HomeIcon className="size-3 sm:hidden" />,
    textClass: "",
    contendorClass:
      "sm:gap-0 sm:px-5 sm:py-0 sm:rounded-xl sm:bg-gray-900 sm:text-white sm:py-1",
    href: "/",
  },
  {
    label: "Productos",
    icon: <BoxesIcon className="size-3 sm:hidden" />,
    textClass: "",
    contendorClass:
      "sm:gap-0 sm:px-5 sm:py-0 sm:rounded-xl sm:bg-secondaryColor sm:text-black sm:py-1",
    href: "/",
  },
  {
    label: "Perfil",
    icon: <UserIcon className="size-3" />,
    textClass: "sm:hidden",
    contendorClass:
      "sm:gap-0 sm:px-3 sm:py-2 sm:rounded-full sm:bg-secondaryColor sm:text-black",
    href: "/login",
  },
  {
    label: "Productos Favoritos",
    icon: <HeartIcon className="text-red-600 size-3" />,
    textClass: "sm:hidden",
    contendorClass:
      "sm:gap-0 sm:ml-10  sm:px-3 sm:py-2 sm:rounded-full sm:bg-secondaryColor sm:text-black",
    href: "/login",
  },
  {
    label: "Carrito de compras",
    icon: <CartShoppingIcon className="size-3 sm:size-4" />,
    textClass: "sm:hidden",
    contendorClass:
      "sm:gap-0 sm:px-3 sm:py-2 sm:rounded-full sm:bg-secondaryColor sm:text-black",
    href: "/login",
  },
];

function Header() {
  const [showNav, setShowNav] = useState(false);

  return (
    <header className="h-[58px] px-10 fixed top-0 w-full flex justify-between items-center sm:py-0 bg-white z-50">
      <Link href={"/"} className="text-lg font-bold scale-100">
        PrimeTech
      </Link>
      <nav className="relative flex flex-col items-end">
        <span>
          {showNav ? (
            <XmarkIcon
              className="cursor-pointer size-6 sm:hidden"
              onClick={() => setShowNav(!showNav)}
            />
          ) : (
            <MenuIcon
              className="cursor-pointer size-5 sm:hidden"
              onClick={() => setShowNav(!showNav)}
            />
          )}
        </span>
        <ul
          className={`
              bg-secondaryColor transition-all duration-500 ease-in-out
              absolute top-8 rounded-xl
              transform origin-top-right
              ${showNav ? "opacity-100 scale-100" : "opacity-0 scale-0"}
              flex flex-col text-sm text-right gap-y-4 py-2 px-5 list-none
              sm:opacity-100 sm:scale-100 sm:relative sm:top-auto
              sm:flex-row sm:gap-5 sm:rounded-none sm:bg-transparent
              `}
        >
          {navItems.map(({ label, icon, textClass, contendorClass, href }) => (
            <li
              key={label}
            >
              <Link
                href={href}
                className={`flex justify-between items-center text-left gap-10 whitespace-nowrap text-gray-700 ${contendorClass}`}
              >
                {icon}
                <span className={`${textClass}`}>{label}</span>
              </Link>
            </li>
          ))}
          
        </ul>
      </nav>
    </header>
  );
}

export default Header;
