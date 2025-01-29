"use client";

import ProductItem from "@/share/components/ProductItem";
import { useProducts } from "@/share/hook/useGetProducts";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function ProductsList() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const filterKeys = [
      "brand",
      "name",
      "categoryId",
      "sellerId",
      "minPrice",
      "maxPrice",
      "page",
      "size",
      "onSale",
      "minRating",
    ];

    const appliedFilters = filterKeys.reduce((objeto, filterKey) => {
      const valor = searchParams.get(filterKey);
      if (valor) {
        return { ...objeto, [filterKey]: valor };
      }
      return objeto;
    }, {});

    setFilters(appliedFilters);
  }, [searchParams]);

  const { data, isLoading, isError } = useProducts(
    Object.keys(filters).length === 0 ? undefined : filters
  );

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar productos</div>;

  return (
    <div className="mt-[56px] pb-3 grid grid-cols-2 gap-x-5 gap-y-3 justify-items-center sm:grid-cols-3 px-5 md:px-16 lg:ml-60">
      {data && data.products && data.products.length > 0 ? (
        data.products.map((product) => (
          <ProductItem
            isFavorite={false}
            classContainer="w-full min-h-[252px] max-h-[252px] sm:min-w-[200px] sm:max-w-[200px]"
            product={product}
            key={product.productId}
          />
        ))
      ) : (
        <div>No se encontraron productos</div>
      )}
    </div>
  );
}

export default ProductsList;
