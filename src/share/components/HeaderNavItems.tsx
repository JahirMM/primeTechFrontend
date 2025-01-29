"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useAuthStore } from "@/share/hook/store/useAuth";

import CartShoppingIcon from "@/icons/CartShoppingIcon";
import BoxesIcon from "@/icons/BoxesIcon";
import HeartIcon from "@/icons/HeartIcon";
import HomeIcon from "@/icons/HomeIcon";

import HeaderProfileNavItem from "@/share/components/HeaderProfileNavItem";

import HeaderNavItemsSkeleton from "@/share/skeletons/HeaderNavItemsSkeleton";

const navItems = [
  {
    label: "Iniciar sesion",
    icon: <BoxesIcon className="size-3 sm:hidden" />,
    textClass: "",
    contendorClass:
      "sm:gap-0 sm:px-5 sm:py-0 sm:rounded-xl sm:bg-primaryColor sm:text-white sm:py-1",
    href: "/login",
    requiresAuth: false,
  },
  {
    label: "Regístrate",
    icon: <BoxesIcon className="size-3 sm:hidden" />,
    textClass: "",
    contendorClass:
      "sm:gap-0 sm:px-5 sm:py-0 sm:rounded-xl sm:border sm:border-gray-900 sm:text-black sm:py-1",
    href: "/signUp",
    requiresAuth: false,
  },
  {
    label: "Productos Favoritos",
    icon: <HeartIcon className="text-red-600 size-3" />,
    textClass: "sm:hidden",
    contendorClass:
      "sm:gap-0 sm:ml-10  sm:px-3 sm:py-2 sm:rounded-full sm:bg-secondaryColor sm:text-black",
    href: "/favoriteProducts",
    requiresAuth: true,
  },
  {
    label: "Carrito de compras",
    icon: <CartShoppingIcon className="size-3 sm:size-4" />,
    textClass: "sm:hidden",
    contendorClass:
      "sm:gap-0 sm:px-3 sm:py-2 sm:rounded-full sm:bg-secondaryColor sm:text-black",
    href: "/",
    requiresAuth: true,
  },
];

function HeaderNavItems({
  showNav,
  setShowNav,
}: {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await initializeAuth();
      setLoading(false);
    };
    initialize();
  }, [initializeAuth]);

  return (
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
      <li>
        <Link
          href={"/"}
          className="flex items-center justify-between gap-10 text-left whitespace-nowrap sm:gap-0 sm:px-5 sm:rounded-xl sm:bg-gray-900 sm:text-white sm:py-1"
          onClick={() => setShowNav(!showNav)}
        >
          <HomeIcon className="size-3 sm:hidden" />
          <span>Inicio</span>
        </Link>
      </li>
      <li>
        <Link
          href={"/"}
          className="flex items-center justify-between gap-10 text-left whitespace-nowrap sm:gap-0 sm:px-5 sm:rounded-xl sm:bg-secondaryColor sm:text-black sm:py-1"
          onClick={() => setShowNav(!showNav)}
        >
          <BoxesIcon className="size-3 sm:hidden" />
          <span>Productos</span>
        </Link>
      </li>
      {isAuthenticated && <HeaderProfileNavItem showNav={showNav} setShowNav={setShowNav} />}
      {loading ? (
        <HeaderNavItemsSkeleton />
      ) : (
        navItems.map(
          ({ label, icon, textClass, contendorClass, href, requiresAuth }) => (
            <li
              key={label}
              className={`${
                requiresAuth === null
                  ? ""
                  : isAuthenticated === requiresAuth
                  ? "inline-block"
                  : "hidden"
              }`}
            >
              <Link
                href={href}
                className={`flex justify-between items-center text-left gap-10 whitespace-nowrap text-gray-700 ${contendorClass}`}
                onClick={() => setShowNav(!showNav)}
              >
                {icon}
                <span className={`${textClass}`}>{label}</span>
              </Link>
            </li>
          )
        )
      )}
    </ul>
  );
}

export default HeaderNavItems;
