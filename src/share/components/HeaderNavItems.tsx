"use client";

import Link from "next/link";

import useFetchAuthStatus from "@/share/hook/useFetchAuthStatus";
import { useAuthStore } from "@/share/hook/store/useAuth";
import { useLogout } from "@/share/hook/useLogout";

import CartShoppingIcon from "@/icons/CartShoppingIcon";
import BoxesIcon from "@/icons/BoxesIcon";
import HeartIcon from "@/icons/HeartIcon";
import HomeIcon from "@/icons/HomeIcon";

import HeaderProfileNavItem from "@/share/components/HeaderProfileNavItem";

import HeaderNavItemsSkeleton from "@/share/skeletons/HeaderNavItemsSkeleton";

const navItems = [
  {
    label: "Iniciar sesión",
    icon: null,
    textClass: "",
    contendorClass:
      "sm:gap-0 sm:px-5 sm:py-0 sm:rounded-xl sm:bg-primaryColor sm:text-white sm:py-1",
    href: "/login",
    requiresAuth: false,
  },
  {
    label: "Regístrate",
    icon: null,
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
    href: "/shopping-cart",
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
  const mutationLogout = useLogout();

  const { isAuthenticated } = useAuthStore();
  const loading = useFetchAuthStatus();

  const handleLogout = () => {
    mutationLogout.mutate();
  };

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
          aria-label="Inicio"
        >
          <HomeIcon className="size-3 sm:hidden" />
          <span>Inicio</span>
        </Link>
      </li>
      <li>
        <Link
          href={"/products"}
          className="flex items-center justify-between gap-10 text-left whitespace-nowrap sm:gap-0 sm:px-5 sm:rounded-xl sm:bg-secondaryColor sm:text-black sm:py-1"
          onClick={() => setShowNav(!showNav)}
          aria-label="Prodictos"
        >
          <BoxesIcon className="size-3 sm:hidden" />
          <span>Productos</span>
        </Link>
      </li>
      {isAuthenticated && (
        <HeaderProfileNavItem showNav={showNav} setShowNav={setShowNav} />
      )}
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
                aria-label={label}
              >
                {icon ? icon : <div className="sm:hidden"></div>}
                <span className={`${textClass}`}>{label}</span>
              </Link>
            </li>
          )
        )
      )}
      {isAuthenticated && (
        <li className="sm:hidden">
          <span className="flex items-center justify-between gap-10 text-left whitespace-nowrap sm:gap-0 sm:px-5 sm:rounded-xl sm:bg-gray-900 sm:text-white sm:py-1">
            <div></div>
            <span
              className="font-semibold cursor-pointer text-primaryColor"
              onClick={handleLogout}
            >
              Cerrar sesión
            </span>
          </span>
        </li>
      )}
    </ul>
  );
}

export default HeaderNavItems;
