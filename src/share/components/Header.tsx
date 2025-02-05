"use client";

import { useState } from "react";
import Link from "next/link";

import XmarkIcon from "@/icons/XmarkIcon";
import MenuIcon from "@/icons/MenuIcon";

import HeaderNavItems from "@/share/components/HeaderNavItems";

function Header() {
  const [showNav, setShowNav] = useState(false);

  return (
    <header className="h-[58px] px-10 fixed top-0 w-full flex justify-between items-center sm:py-0 bg-white z-[80]">
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
        <HeaderNavItems showNav={showNav} setShowNav={setShowNav}/>
      </nav>
    </header>
  );
}

export default Header;
