import React from "react";
import Marquee from "../Marquee";
import ProductItem from "@/share/components/ProductItem";

function PopularProductsSection() {
  return (
    <section className="bg-sectionColor py-10">
      <Marquee />
      <div className="mt-10 px-10">
        <header className="flex gap-3 items-center">
          <h2 className="text-lg font-bold whitespace-nowrap">Productos populares</h2>
          <span className="h-[1px] bg-gray-500 w-full block"></span>
        </header>
        <ul
          className="mt-10 w-full overflow-auto flex gap-5"
          aria-label="Lista de productos recientes"
        >
          <li>
            <ProductItem />
          </li>
        </ul>
      </div>
    </section>
  );
}

export default PopularProductsSection;
