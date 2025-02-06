import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import { CategoryItemsInterface } from "@/share/interfaces/categoryItemsInterface";

import BrandAndPriceFilterSkeleton from "@/products/skeletons/BrandAndPriceFilterSkeleton";
import CategoryFilterSkeleton from "@/products/skeletons/CategoryFilterSkeleton";

import RatingFilter from "@/products/components/filter/RatingFilter";
import BrandFilter from "@/products/components/filter/BrandFilter";
import PriceFilter from "@/products/components/filter/Pricefilter";

import { useGetFilterData } from "@/products/hook/useGetFilterData";
import { useCategories } from "@/share/hook/useGetCategories";

import FilterIcon from "@/icons/FilterIcon";
import SearchIcon from "@/icons/SearchIcon";
import CategoryFilter from "./CategoryFilter";

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
  const [searchBrand, setSearchBrand] = useState(
    searchParams.get("brand") || ""
  );
  const [searchName, setSearchName] = useState(searchParams.get("name") || "");
  const [minValue, setMinValue] = useState(
    Number(searchParams.get("minPrice")) || 0
  );
  const [maxValue, setMaxValue] = useState(
    Number(searchParams.get("maxPrice")) || 0
  );
  const [minRating, setMinRating] = useState(() => {
    const rating = Number(searchParams.get("minRating"));
    return isNaN(rating) ? 0 : rating;
  });

  useEffect(() => {
    if (filterData) {
      setMinValue(filterData.minPrice || 0);
      setMaxValue(filterData.maxPrice || 0);
    }
  }, [filterData]);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const cleanFilter = () => {
    router.push("/products");

    setShowFilter(false);

    setSelectedCategory("");
    setSearchBrand("");
    setSearchName("");
    setMinValue(filterData?.minPrice || 0);
    setMaxValue(filterData?.maxPrice || 0);
    setMinRating(0);
  };

  const handleSearch = () => {
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

    const queryString = params.toString();
    router.push(`/products${queryString ? `?${queryString}` : ""}`);
    setShowFilter(false);
  };

  const categoryItems: CategoryItemsInterface[] = categoryData || [];

  return (
    <>
      <div className="bg-white px-5 fixed flex items-center z-[70] w-full h-[52px] md:px-40 lg:px-60">
        <div className="flex items-center w-full gap-x-4">
          <FilterIcon
            className="cursor-pointer text-primaryColor size-5"
            onClick={toggleFilter}
          />
          <input
            type="text"
            className="flex-1 p-2 bg-white border border-gray-400 rounded-xl"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <SearchIcon
            className="cursor-pointer size-5 text-primaryColor"
            onClick={handleSearch}
          />
        </div>
      </div>
      <div
        className={`
        fixed z-[90] left-0
        p-2
        mt-[48px] 
        min-h-[calc(100vh-58px-52px)] w-60 
        bg-white
        shadow-xl
        transition-transform duration-500 ease-in
        ${showFilter ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        `}
      >
        <div className="h-full p-2 bg-secondaryColor rounded-xl">
          <span className="block text-base font-bold uppercase">Filtros</span>

          {isCategoryLoading ? (
            <CategoryFilterSkeleton />
          ) : isCategoryError ? (
            <FilterError
              containerClass="pb-5 mt-3 border-b border-b-gray-400"
              title="Categorías"
            />
          ) : (
            <CategoryFilter
              categoryItems={categoryItems}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
          {isFilterLoading ? (
            <BrandAndPriceFilterSkeleton />
          ) : isFilterError ? (
            <>
              <FilterError
                containerClass="pb-5 mt-5 border-b border-b-gray-400"
                title="Marca"
              />
              <FilterError
                containerClass="w-full p-3 mt-5 bg-white rounded-xl"
                title="Price"
              />
            </>
          ) : (
            filterData && (
              <>
                <BrandFilter
                  brands={filterData.brands || []}
                  searchBrand={searchBrand}
                  setSearchBrand={setSearchBrand}
                />
                <PriceFilter
                  minPrice={filterData.minPrice || 0}
                  maxPrice={filterData.maxPrice || 0}
                  minValue={minValue}
                  maxValue={maxValue}
                  setMinValue={setMinValue}
                  setMaxValue={setMaxValue}
                />
              </>
            )
          )}
          <RatingFilter minRating={minRating} setMinRating={setMinRating} />
          <button
            className="w-full p-2 mt-4 text-sm text-white rounded-md bg-primaryColor"
            onClick={cleanFilter}
          >
            borrar filtro
          </button>
          <button
            className="w-full p-2 mt-4 text-sm text-white rounded-md bg-primaryColor"
            onClick={handleSearch}
          >
            Aplicar filtro
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductFilter;
