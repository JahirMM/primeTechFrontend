import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

import { CategoryItemsInterface } from "@/share/interfaces/categoryItemsInterface";

import FilterSidebar from "@/products/components/filter/FilterSidebar";
import NameFilter from "@/products/components/filter/NameFilter";

import { useGetFilterData } from "@/products/hook/useGetFilterData";
import { useCategories } from "@/share/hook/useGetCategories";

function ProductFilter() {
  const {
    data: filterData,
    isLoading: isFilterLoading,
    isError: isFilterError,
  } = useGetFilterData();
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategories();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [showFilter, setShowFilter] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categoryId") || ""
  );
  const [minValue, setMinValue] = useState(
    Number(searchParams.get("minPrice")) || 0
  );
  const [maxValue, setMaxValue] = useState(
    Number(searchParams.get("maxPrice")) || 0
  );
  const [searchBrand, setSearchBrand] = useState(
    searchParams.get("brand") || ""
  );
  const [searchName, setSearchName] = useState(searchParams.get("name") || "");

  const [minRating, setMinRating] = useState(() => {
    const rating = Number(searchParams.get("minRating") || 0);
    return isNaN(rating) ? 0 : rating;
  });

  const [onSale, setOnSale] = useState<boolean | null>(() => {
    const onSaleParam = searchParams.get("onSale");
    return onSaleParam === "true"
      ? true
      : onSaleParam === "false"
      ? false
      : null;
  });

  useEffect(() => {
    if (filterData) {
      setMinValue(filterData.minPrice || 0);
      setMaxValue(filterData.maxPrice || 0);
    }
  }, [filterData]);

  useEffect(() => {
    setMinRating(Number(searchParams.get("minRating") || 0));
  }, [searchParams]);

  const toggleFilter = useCallback(() => {
    setShowFilter((prev) => !prev);
  }, []);

  const cleanFilter = useCallback(() => {
    router.push("/products");

    setShowFilter(false);
    setSelectedCategory("");
    setSearchBrand("");
    setSearchName("");
    setMinValue(filterData?.minPrice || 0);
    setMaxValue(filterData?.maxPrice || 0);
    setMinRating(0);
    setOnSale(null);
  }, [router, filterData]);

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();

    if (searchName.trim()) {
      params.set("name", searchName.trim());
    }
    if (searchBrand.trim()) {
      params.set("brand", searchBrand.trim());
    }
    if (minRating > 0 || minRating < 5) {
      params.set("minRating", minRating.toString());
    }
    if (minValue !== filterData?.minPrice) {
      params.set("minPrice", minValue.toString());
    }
    if (maxValue !== filterData?.maxPrice) {
      params.set("maxPrice", maxValue.toString());
    }
    if (selectedCategory) {
      params.set("categoryId", selectedCategory);
    }
    if (onSale) {
      params.set("onSale", onSale.toString());
    }

    const queryString = params.toString();
    router.push(`/products${queryString ? `?${queryString}` : ""}`);
    setShowFilter(false);
  }, [
    router,
    searchName,
    searchBrand,
    minRating,
    minValue,
    maxValue,
    selectedCategory,
    onSale,
    filterData,
  ]);

  const categoryItems: CategoryItemsInterface[] = categoryData || [];

  return (
    <>
      <NameFilter
        searchName={searchName}
        setSearchName={setSearchName}
        handleSearch={handleSearch}
        showFilter={showFilter}
        toggleFilter={toggleFilter}
      />
      <FilterSidebar
        showFilter={showFilter}
        categoryItems={categoryItems}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchBrand={searchBrand}
        setSearchBrand={setSearchBrand}
        minValue={minValue}
        maxValue={maxValue}
        setMinValue={setMinRating}
        setMaxValue={setMaxValue}
        minRating={minRating}
        setMinRating={setMinRating}
        onSale={onSale}
        setOnSale={setOnSale}
        isCategoryLoading={isCategoryLoading}
        isCategoryError={isCategoryError}
        isFilterLoading={isFilterLoading}
        isFilterError={isFilterError}
        filterData={filterData!}
        cleanFilter={cleanFilter}
        handleSearch={handleSearch}
      />
    </>
  );
}

export default ProductFilter;
