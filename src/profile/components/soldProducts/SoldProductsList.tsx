"use client";

import ProfileProductListSkeleton from "@/profile/skeletons/ProfileProductListSkeleton";

import SoldProduct from "@/profile/components/soldProducts/SoldProduct";
import EmptyStateMessage from "@/profile/components/EmptyStateMessage";
import ErrorMessage from "@/profile/components/ErrorMessage";

import { useSoldProduct } from "@/profile/hook/useSoldProduct";
import { formatDate } from "@/share/utils/formatDate";

function SoldProductsList() {
  const { data, isLoading, isError } = useSoldProduct();

  if (isLoading) {
    return <ProfileProductListSkeleton />;
  }

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
      {data && data.soldProduct && data.soldProduct.length > 0 ? (
        data.soldProduct.map((soldProduct) => (
          <article
            className="p-4 border border-gray-300 rounded-xl"
            key={soldProduct.soldId}
          >
            <div className="flex justify-between">
              <span className="block mb-6 text-sm">
                {formatDate(soldProduct.saleDate)}
              </span>
              <span className="block text-sm font-bold text-primaryColor">
                vendido
              </span>
            </div>
            <SoldProduct soldProduct={soldProduct} />
          </article>
        ))
      ) : (
        <EmptyStateMessage
          title="No has vendido ningún producto todavía"
          message="Parece que aún no has realizado ninguna venta. ¡Publica tus productos y empieza a vender ahora!"
          buttonText="Agregar Producto"
          buttonLink="/add-product"
        />
      )}
    </div>
  );
}

export default SoldProductsList;
