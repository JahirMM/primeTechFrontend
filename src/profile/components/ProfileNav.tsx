"use client";

import { useState } from "react";
import Link from "next/link";

import BagShoppingIcon from "@/icons/BagShoppingIcon";
import UserCircleIcon from "@/icons/UserCircleIcon";
import ChevronIcon from "@/icons/ChevronIcon";
import BoxIcon from "@/icons/BoxIcon";
import SaleIcon from "@/icons/SaleIcon";

function ProfileNav() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  return (
    <section className="absolute z-10 w-full px-3 py-4 mt-5 bg-secondaryColor sm:rounded-xl sm:py-5 sm:relative sm:w-auto">
      <div
        className={`flex items-center gap-x-2 ${showMenu ? "mb-4" : "mb-0"} cursor-pointer sm:mb-10 sm:pointer-events-none`}
        onClick={toggleMenu}
      >
        <span className="text-sm">Mi cuenta</span>
        <ChevronIcon className="size-3" />
      </div>
      <nav className={`${showMenu ? "inline-block" : "hidden"} sm:inline-block`}>
        <ul className="flex flex-col gap-y-8">
          <li>
            <Link href={"/profile"} className="flex items-center gap-x-3">
              <UserCircleIcon className="size-7" />
              <span className="text-sm">Mi perfil</span>
            </Link>
          </li>
          <li>
            <Link
              href={"/profile/purchases"}
              className="flex items-center gap-x-3"
            >
              <BagShoppingIcon className="size-7" />
              <span className="text-sm">Compras</span>
            </Link>
          </li>
          <li>
            <Link href={"/profile/sales"} className="flex items-center gap-x-3">
              <SaleIcon className="size-7" />
              <span className="text-sm">Ventas</span>
            </Link>
          </li>
          <li>
            <Link
              href={"/profile/my-products"}
              className="flex items-center gap-x-3"
            >
              <BoxIcon className="size-7" />
              <span className="text-sm">Mis productos</span>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default ProfileNav;
