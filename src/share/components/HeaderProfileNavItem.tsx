import Link from "next/link";

import ArrowIcon from "@/icons/ArrowIcon";
import UserIcon from "@/icons/UserIcon";

import { useGetUserInformation } from "@/share/hook/useGetUserInformation";

import HeaderUserPicture from "@/share/components/HeaderUserPicture";
import { uselogout } from "../hook/useLogout";

function HeaderProfileNavItem({
  showNav,
  setShowNav,
}: {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const mutationLogout = uselogout();
  const { data: userInformation, isLoading: userInfoLoading } =
    useGetUserInformation();

  const handleLogout = () => {
    mutationLogout.mutate()
  }

  return (
    <li className="relative group">
      <Link
        href="/profile"
        className="flex items-center justify-between gap-10 text-left text-gray-700 whitespace-nowrap sm:gap-0 sm:px-3 sm:py-2 sm:rounded-full sm:bg-secondaryColor sm:text-black"
        onClick={() => setShowNav(!showNav)}
      >
        <UserIcon className="size-3" />
        <span className="sm:hidden">Perfil</span>
      </Link>

      <div className="absolute hidden mt-1 bg-white border border-gray-400 rounded-xl w-44 sm:group-hover:block sm:right-0 sm:origin-top-right">
        {userInfoLoading ? (
          <p className="px-4 py-2">Cargando...</p>
        ) : (
          <ul className="py-4 space-y-4">
            <li>
              <Link href={"/profile"} className="flex items-center gap-3 px-4">
                <HeaderUserPicture />

                <div className="flex flex-col text-left gap-y-1">
                  {userInformation ? (
                    <>
                      <span className="text-sm font-bold text-nowrap">
                        {userInformation.user.firstName}{" "}
                        {userInformation.user.paternalSurname}
                      </span>
                      <div className="flex items-center text-xs gap-x-2">
                        <span>Mi perfil</span>
                        <ArrowIcon className="font-light size-2" />
                      </div>
                    </>
                  ) : (
                    <p className="text-sm">Cargando...</p>
                  )}
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
            <li className="px-4 py-1 text-left">
              <span
                className="px-3 py-2 text-xs text-black transition-colors duration-200 ease-in border rounded-lg cursor-pointer border-primaryColor hover:bg-primaryColor hover:text-white"
                onClick={handleLogout}
              >
                Cerrar sesión
              </span>
            </li>
          </ul>
        )}
      </div>
    </li>
  );
}

export default HeaderProfileNavItem;
