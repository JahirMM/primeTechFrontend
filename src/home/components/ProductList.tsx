"use client";

import { useProducts } from "@/share/hook/useGetProducts";

import ProductItem from "@/share/components/ProductItem";
import { FilterInterface } from "@/share/interfaces/filterInterface";
import ProductListSkeleton from "../skeletons/ProductListSkeleton";

function ProductList({
  filter,
  withBorder,
}: {
  filter: FilterInterface;
  withBorder: boolean;
}) {
  const { data, isLoading, isError, error } = useProducts(filter);

  if (isLoading) return <ProductListSkeleton withMargin={withBorder} />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <ul
      className="flex w-full gap-5 overflow-auto"
      aria-label="Lista de productos recientes"
    >
      {data?.products && data.products.length > 0 ? (
        data.products.map((product) => (
          <li key={product.productId}>
            <ProductItem
              isFavorite={false}
              styleClass={withBorder ? "border-[1px] border-gray-400" : "mt-10"}
              product={product}
            />
          </li>
        ))
      ) : (
        <div>No hay productos</div>
      )}
    </ul>
  );
}

export default ProductList;
