import Link from "next/link";

import ArrowIcon from "@/icons/ArrowIcon";
import UserIcon from "@/icons/UserIcon";

import { useGetUserInformation } from "@/share/hook/useGetUserInformation";

function HeaderProfileNavItem() {
  const { data: userInformation, isLoading } = useGetUserInformation();

  return (
    <li className="relative group">
      <div className="flex items-center justify-between gap-10 text-left text-gray-700 whitespace-nowrap sm:gap-0 sm:px-3 sm:py-2 sm:rounded-full sm:bg-secondaryColor sm:text-black">
        <UserIcon className="size-3" />
        <span className="sm:hidden">Perfil</span>
      </div>
      <div className="absolute hidden mt-1 bg-white border border-gray-400 rounded-xl w-44 sm:group-hover:block sm:right-0 sm:origin-top-right">
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <ul className="py-4 space-y-4">
            <li>
              <Link href={"/profile"} className="flex items-center gap-3 px-4">
                <img
                  src="/images/home/img-home.svg"
                  alt=""
                  className="bg-red-300 rounded-full size-10"
                />
                <div className="flex flex-col text-left gap-y-1">
                  <span className="text-sm font-bold text-nowrap">
                    {userInformation!.user.firstName}{" "}
                    {userInformation!.user.paternalSurname}
                  </span>
                  <div className="flex items-center text-xs gap-x-2">
                    <span>Mi perfil</span>
                    <ArrowIcon className="font-light size-2" />
                  </div>
                </div>
              </Link>
            </li>
            <li className="px-4 py-1 text-sm text-left hover:bg-gray-200">
              <Link href={"/profile/purchases"}>Compras</Link>
            </li>
            <li className="px-4 py-1 text-sm text-left hover:bg-gray-200">
              <Link href={"/profile/sales"}>Ventas</Link>
            </li>
            <li className="px-4 py-1 text-sm text-left hover:bg-gray-200">
              <Link href={"/profile/my-products"}>Mis productos</Link>
            </li>
          </ul>
        )}
      </div>
    </li>
  );
}

export default HeaderProfileNavItem;
