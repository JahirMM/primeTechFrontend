"use client";

import ProductItem from "@/share/components/ProductItem";
import { useFavoriteProducts } from "../hook/useGetFavoriteProducts";

function FavoriteProductsList() {
  const { data, isLoading, isError } = useFavoriteProducts();

  if (isLoading) {
    return <div>cargando ...</div>;
  }

  if (isError) {
    return <div>error en la carga de productos favoritos</div>;
  }

  if (!data || !data.favoriteProducts) {
    return <div>No hay productos favoritos disponibles.</div>;
  }

  return (
    <section className="grid grid-cols-1 bg-red-400 justify-items-center">
      {data.favoriteProducts.length > 0 ? (
        data.favoriteProducts.map((product) => (
          <ProductItem
            key={product.productId}
            isFavorite={true}
            styleClass="border-[1px] border-gray-400"
            product={product}
          />
        ))
      ) : (
        <div>No tienes productos favoritos.</div>
      )}
    </section>
  );
}

export default FavoriteProductsList;
