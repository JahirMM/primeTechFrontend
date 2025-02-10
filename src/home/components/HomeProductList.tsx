"use client";

import { useProducts } from "@/share/hook/useGetProducts";

import CarouselContainer from "@/home/components/CarouselContainer";
import ProductItem from "@/share/components/ProductItem";

import ProductListSkeleton from "@/home/skeletons/ProductListSkeleton";

import { FilterInterface } from "@/share/interfaces/filterInterface";

import { useRef } from "react";

function HomeProductList({
  filter,
  withBorder,
}: {
  filter: FilterInterface;
  withBorder: boolean;
}) {
  const { data, isLoading, isError, error } = useProducts(filter);
  const listRef = useRef<HTMLUListElement>(null);

  if (isLoading) return <ProductListSkeleton withMargin={withBorder} />;
  if (isError) return <p>Error: {error.message}</p>;

  return data ? (
    <CarouselContainer listRef={listRef} listLength={data?.products.length}>
      <ul
        ref={listRef}
        className="flex w-full gap-5 overflow-auto"
        aria-label="Lista de productos recientes"
      >
        {data?.products && data.products.length > 0 ? (
          data.products.map((product) => (
            <li key={product.productId}>
              <ProductItem
                isFavorite={false}
                classContainer={`min-h-[252px] min-w-[216px] max-h-[252px] max-w-[216px]  ${
                  withBorder ? "border-[1px] border-gray-400" : "mt-10"
                }`}
                product={product}
              />
            </li>
          ))
        ) : (
          <div>No hay productos</div>
        )}
      </ul>
    </CarouselContainer>
  ) : null;
}

export default HomeProductList;
