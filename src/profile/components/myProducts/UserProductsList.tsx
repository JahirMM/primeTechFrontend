"use client";

import EmptyStateMessage from "@/profile/components/EmptyStateMessage";
import UserProduct from "@/profile/components/myProducts/UserProduct";
import NotSellerMessage from "@/profile/components/NotSellerMessage";
import ErrorMessage from "@/profile/components/ErrorMessage";
import OfferActions from "@/offer/components/OfferActions";

import ProfileProductListSkeleton from "@/profile/skeletons/ProfileProductListSkeleton";
import { useGetUserProducts } from "@/profile/hook/useGetUserProducts";

import { useGetUserInformation } from "@/share/hook/useGetUserInformation";
import Link from "next/link";

function UserProductsList() {
  const { data: userInformation } = useGetUserInformation();
  const isSeller = !!userInformation?.user.roleNames.includes("seller");

  const { data, isLoading, isError } = useGetUserProducts(isSeller);

  if (isLoading) return <ProfileProductListSkeleton />;

  if (!isSeller) {
    return (
      <NotSellerMessage
        title="Convierte tu Pasión en Ventas"
        message="Parece que aún no eres vendedor. ¡Publica tus productos y alcanza a miles de clientes potenciales!"
        buttonText="Convertirse en Vendedor"
      />
    );
  }

  if (isLoading) return <ProfileProductListSkeleton />;

  if (isError)
    return (
      <ErrorMessage
        title="Ocurrió un error al cargar los productos"
        message="Por favor, intenta nuevamente más tarde."
        buttonText="Reintentar"
        onClick={() => window.location.reload()}
      />
    );

  return (
    <div className="flex flex-col gap-y-20">
      {data && data.product && data.product.length > 0
        ? data.product.map((product) => (
            <article
              className="flex flex-col gap-5 p-4 border border-gray-300 sm:items-center rounded-xl sm:flex-row sm:justify-between"
              key={product.productId}
            >
              <UserProduct product={product} />
              <div className="flex flex-col gap-3">
                <Link
                  href={`/profile/my-products/${product.productId}`}
                  className="px-3 py-2 text-xs text-center transition-colors duration-300 border border-black rounded-lg hover:text-white hover:bg-primaryColor hover:border-primaryColor"
                >
                  Editar información
                </Link>
                <OfferActions productId={product.productId} />
              </div>
            </article>
          ))
        : isSeller && (
            <EmptyStateMessage
              title="No has publicado ningún producto todavía"
              message="Parece que aún no has añadido productos. ¡Empieza a vender ahora!"
              buttonText="Agregar Producto"
              buttonLink="/profile/add-product"
            />
          )}
    </div>
  );
}

export default UserProductsList;
