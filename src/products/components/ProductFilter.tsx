"use client";

import FilterIcon from "@/icons/FilterIcon";
import SearchIcon from "@/icons/SearchIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";

function ProductFilter() {
  const [showFilter, setShowFilter] = useState(false);
  const [searchName, setSearchName] = useState("");
  const router = useRouter();

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleSearch = () => {
    if (searchName === "" || searchName === null || searchName === undefined) {
      router.push("/products");
    }
    if (searchName.trim()) {
      router.push(`/products?name=${encodeURIComponent(searchName.trim())}`);
    }
  };

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
        <div className="h-full p-2 text-base font-bold uppercase bg-secondaryColor rounded-xl">
          filtros
        </div>
      </div>
    </>
  );
}

export default ProductFilter;
