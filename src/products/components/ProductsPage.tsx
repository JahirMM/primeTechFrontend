"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import ProductListSkeleton from "@/products/skeletons/ProductListSkeleton";

import ProductFilter from "@/products/components/filter/ProductFilter";
import ProductsList from "@/products/components/ProductsList";
import Pagination from "@/products/components/Pagination";

import { useProducts } from "@/share/hook/useGetProducts";

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
  "onSale",
];

function ProductsPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const appliedFilters = filterKeys.reduce((objeto, filterKey) => {
      const value = searchParams.get(filterKey);
      if (value) return { ...objeto, [filterKey]: value };
      return objeto;
    }, {});

    setFilters(appliedFilters);
  }, [searchParams]);

  const { data, isLoading, isError } = useProducts(
    Object.keys(filters).length === 0 ? undefined : filters
  );

  return (
    <div className="mt-[58px] grid grid-cols-1 relative">
      <ProductFilter />
      {isLoading ? (
        <ProductListSkeleton />
      ) : isError ? (
        <div>Error</div>
      ) : (
        data && (
          <>
            <ProductsList productList={data} />
            {data.page.totalPages > 1 && (
              <Pagination data={data} filters={filters} />
            )}
          </>
        )
      )}
    </div>
  );
}

export default ProductsPage;
