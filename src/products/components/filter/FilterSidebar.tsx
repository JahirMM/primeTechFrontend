import { SetStateAction } from "react";

import { FilterDataResponseInterface } from "@/products/interfaces/filterDataResponseInterface";
import { CategoryItemsInterface } from "@/share/interfaces/categoryItemsInterface";

import BrandAndPriceFilterSkeleton from "@/products/skeletons/BrandAndPriceFilterSkeleton";
import CategoryFilterSkeleton from "@/products/skeletons/CategoryFilterSkeleton";

import CategoryFilter from "@/products/components/filter/CategoryFilter";
import RatingFilter from "@/products/components/filter/RatingFilter";
import OnSaleFilter from "@/products/components/filter/OnSaleFilter";
import BrandFilter from "@/products/components/filter/BrandFilter";
import PriceFilter from "@/products/components/filter/Pricefilter";

interface FilterSidebarProps {
  showFilter: boolean;
  categoryItems: CategoryItemsInterface[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<SetStateAction<string>>;
  searchBrand: string;
  setSearchBrand: React.Dispatch<SetStateAction<string>>;
  minValue: number;
  maxValue: number;
  setMinValue: React.Dispatch<SetStateAction<number>>;
  setMaxValue: React.Dispatch<SetStateAction<number>>;
  minRating: number;
  setMinRating: React.Dispatch<SetStateAction<number>>;
  onSale: boolean | null;
  setOnSale: React.Dispatch<SetStateAction<boolean | null>>;
  isCategoryLoading: boolean;
  isCategoryError: boolean;
  isFilterLoading: boolean;
  isFilterError: boolean;
  filterData: FilterDataResponseInterface;
  cleanFilter: () => void;
  handleSearch: () => void;
}

function FilterSidebar({
  showFilter,
  categoryItems,
  selectedCategory,
  setSelectedCategory,
  searchBrand,
  setSearchBrand,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  minRating,
  setMinRating,
  onSale,
  setOnSale,
  isCategoryLoading,
  isCategoryError,
  isFilterLoading,
  isFilterError,
  filterData,
  cleanFilter,
  handleSearch,
}: FilterSidebarProps) {
  return (
    <section
      className={`
        fixed z-[90] left-0
        px-2
        mt-[48px] 
        overflow-auto no-scrollbar max-h-[calc(100vh-58px-52px)] w-60 
        bg-white
        shadow-xl
        transition-transform duration-500 ease-in
        ${showFilter ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        `}
    >
      <div className="h-full p-2 overflow-auto bg-secondaryColor rounded-xl">
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
        <OnSaleFilter onSale={onSale} setOnSale={setOnSale} />
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
    </section>
  );
}

export default FilterSidebar;
