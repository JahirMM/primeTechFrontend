"use client";

import FavoriteProductsListSkeleton from "@/favoriteProduct/skeletons/FavoriteProductsListSkeleton";
import ProductItem from "@/share/components/ProductItem";
import MessageBox from "@/share/components/MessageBox";

import { useFavoriteProducts } from "@/favoriteProduct/hook/useGetFavoriteProducts";

function FavoriteProductsList() {
  const { data, isLoading, isError } = useFavoriteProducts();

  if (isLoading) {
    return <FavoriteProductsListSkeleton />;
  }

  if (isError) {
    return (
      <MessageBox
        title="¡Oops! Algo salió mal."
        description="Lo sentimos, pero ocurrió un error inesperado. Por favor, intenta nuevamente o contáctanos si el problema persiste."
        buttonLabel="Reintentar"
        onButtonClick={() => window.location.reload()}
      />
    );
  }

  if (!data || !data.favoriteProducts) {
    return (
      <MessageBox
        title="No hay productos favoritos en estos momentos."
        description="Lo sentimos, pero puedes visitar nuestros productos disponibles:"
        buttonLabel="Ver Productos"
        redirectPath="/products"
      />
    );
  }

  if (data.favoriteProducts.length === 0) {
    return (
      <MessageBox
        title="No hay productos disponibles en tu lista."
        description="¡No te preocupes! Explora nuestro catálogo y descubre una amplia variedad de productos que pueden interesarte:"
        buttonLabel="Ver Catálogo"
        redirectPath="/products"
      />
    );
  }

  return (
    <section className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {data.favoriteProducts.length > 0 &&
        data.favoriteProducts.map((product) => (
          <ProductItem
            key={product.productId}
            isFavorite={true}
            styleClass="border-[1px] border-gray-400"
            product={product}
          />
        ))}
    </section>
  );
}

export default FavoriteProductsList;
