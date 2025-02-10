"use client";

import { useRouter } from "next/navigation";

import SearchIcon from "@/icons/SearchIcon";
import ArrowIcon from "@/icons/ArrowIcon";

function FeaturedSection() {
  const router = useRouter();
  return (
    <div
      className="
    bg-primaryColor py-6 px-4 mt-3 rounded-3xl 
      md:relative md:z-10
      md:w-[75%] md:m-auto 
      md:py-8
      lg:py-11 lg:px-10
      xl:w-[65%]"
    >
      <div className="flex items-center gap-2 p-2 bg-secondaryColor rounded-xl">
        <SearchIcon className="size-4" />
        <input type="text" className="flex-1 px-1 bg-secondaryColor" />
      </div>
      <div className="grid grid-cols-6 gap-3 mt-4 text-sm md:mt-10 md:grid-cols-11">
        <a
          href="#recentSection"
          className="
          cursor-pointer bg-transparent border border-black rounded-xl 
          col-start-1 col-end-3 
          text-center py-6 px-3 
          flex justify-center items-center
          md:max-h-[50%] md:py-10
          "
        >
          <span className="text-white">Recientes</span>
        </a>
        <div
          className="flex items-center justify-center col-start-3 col-end-7 gap-3 px-3 py-6 bg-white cursor-pointer rounded-xl md:flex-col md:col-start-3 md:col-end-6 md:py-10 lg:flex-row xl:py-16"
          onClick={() => router.push("/products?minRating=4")}
        >
          <span className="md:text-center">Productos populares</span>
          <span className="p-3 rounded-full bg-secondaryColor">
            <ArrowIcon className="size-4" />
          </span>
        </div>
        <div className="flex flex-col items-center justify-center col-start-1 col-end-4 gap-3 px-3 py-6 text-center bg-white cursor-pointer rounded-xl md:col-start-6 md:col-end-10 md:py-10 md:flex-row xl:py-16">
          <span>Ofertas especiales</span>
          <span className="p-3 rounded-full bg-secondaryColor">
            <ArrowIcon className="size-4" />
          </span>
        </div>
        <div
          className="flex flex-col items-center justify-center col-start-4 col-end-7 gap-3 px-3 py-6 cursor-pointer bg-secondaryColor rounded-xl md:col-start-10 md:col-end-12 md:py-10 xl:py-16"
          onClick={() => router.push("/products")}
        >
          <span className="md:text-center">Ver todo</span>
          <span className="p-3 bg-white rounded-full">
            <ArrowIcon className="size-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default FeaturedSection;
