"use client";

import { useEffect, useRef, useState } from "react";

import { Product } from "@/share/interfaces/productInterface";

import CarouselContainer from "@/home/components/CarouselContainer";
import ProductItem from "@/share/components/ProductItem";
import Marquee from "@/home/components/Marquee";

import ProductListSkeleton from "@/home/skeletons/ProductListSkeleton";


function RecentSection() {
  const [listRecentProducts, setListRecentProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const recentProducts = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );
    setListRecentProducts(recentProducts);
    setIsLoading(false);
  }, []);

  const listRef = useRef<HTMLUListElement>(null);

  return (
    <section className="py-10 mt-20 bg-sectionColor" id="recentSection">
      <Marquee />
      <div className="px-10 mt-10">
        <header className="flex items-center gap-3">
          <h2 className="text-lg font-bold">Recientes</h2>
          <span className="h-[1px] bg-gray-500 w-full block"></span>
        </header>
        {isLoading ? (
          <ProductListSkeleton withMargin={false} />
        ) : (
          <CarouselContainer listRef={listRef} listLength={listRecentProducts.length}>
            <ul
              ref={listRef}
              className="flex w-full gap-5 mt-10 overflow-auto no-scrollbar"
              aria-label="Lista de productos recientes"
            >
              {listRecentProducts.length > 0 ? (
                listRecentProducts.map((product: Product) => (
                  <li key={product.productId}>
                    <ProductItem
                      classContainer={
                        "mb-3 min-h-[252px] min-w-[216px] max-h-[252px] max-w-[216px] "
                      }
                      product={product}
                      isFavorite={false}
                    />
                  </li>
                ))
              ) : (
                <li className="w-full">
                  <article className="min-h-[252px] max-h-[252px] max p-3 mb-3 flex flex-col items-center justify-center w-full">
                    <p className="text-lg font-semibold">
                      ¡Descubre algo nuevo! Explora nuestros productos y
                      encuentra algo que te encante.
                    </p>
                    <button className="px-4 py-2 mt-3 text-xs text-white uppercase rounded-xl bg-primaryColor">
                      ver productos
                    </button>
                  </article>
                </li>
              )}
            </ul>
          </CarouselContainer>
        )}
      </div>
    </section>
  );
}

export default RecentSection;
