"use client";

import EmptyStateMessage from "@/profile/components/EmptyStateMessage";
import UserProduct from "@/profile/components/myProducts/UserProduct";
import ErrorMessage from "@/profile/components/ErrorMessage";

import ProfileProductListSkeleton from "@/profile/skeletons/ProfileProductListSkeleton";
import { useGetUserProducts } from "@/profile/hook/useGetUserProducts";

function UserProductsList() {
  const { data, isLoading, isError } = useGetUserProducts();

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
      {data && data.product && data.product.length > 0 ? (
        data.product.map((product) => (
          <article
            className="p-4 border border-gray-300 rounded-xl"
            key={product.productId}
          >
            <UserProduct product={product} />
          </article>
        ))
      ) : (
        <EmptyStateMessage
          title="No has publicado ningún producto todavía"
          message="Parece que aún no has añadido productos. ¡Empieza a vender ahora!"
          buttonText="Agregar Producto"
          buttonLink="/add-product"
        />
      )}
    </div>
  );
}

export default UserProductsList;
