"use client";

import { useRef } from "react";

import CarouselContainer from "@/home/components/CarouselContainer";
import AuthMessageBox from "@/share/components/AuthMessageBox";
import ProductItem from "@/share/components/ProductItem";
import Marquee from "@/home/components/Marquee";

import ProductListSkeleton from "@/home/skeletons/ProductListSkeleton";

import { useGetRecentProducts } from "@/share/hook/useGetRecentProducts";
import { useAuthStore } from "@/share/hook/store/useAuth";
import Link from "next/link";

function RecentSection() {
  const { isAuthenticated } = useAuthStore();
  const { data: listRecentProducts, isLoading: recentProductsLoading } =
    useGetRecentProducts(isAuthenticated);
  const listRef = useRef<HTMLUListElement>(null);

  if (!isAuthenticated) {
    return (
      <AuthMessageBox className="py-10 mt-20 bg-sectionColor flex flex-col justify-center items-center" />
    );
  }

  return (
    <section className="py-10 mt-20 bg-sectionColor" id="recentSection">
      <Marquee />
      <div className="px-10 mt-10">
        <header className="flex items-center gap-3">
          <h2 className="text-lg font-bold">Recientes</h2>
          <span className="h-[1px] bg-gray-500 w-full block"></span>
        </header>
        {recentProductsLoading ? (
          <ProductListSkeleton withMargin={false} />
        ) : listRecentProducts ? (
          <CarouselContainer
            listRef={listRef}
            listLength={listRecentProducts.length}
          >
            <ul
              ref={listRef}
              className="flex w-full gap-5 mt-10 overflow-auto no-scrollbar list-none"
              aria-label="Lista de productos recientes"
            >
              {listRecentProducts.length > 0 ? (
                listRecentProducts.map(
                  ({
                    productId,
                    name,
                    brand,
                    price,
                    imageUrl,
                    activeOffer,
                    averageRating,
                    discountPercentage,
                  }) => {
                    const product = {
                      productId,
                      name,
                      brand,
                      price,
                      image: imageUrl,
                      averageRating,
                      activeOffer,
                      discountPercentage,
                    };

                    return (
                      <li key={productId}>
                        <ProductItem
                          classContainer="mb-3 min-h-[252px] min-w-[216px] max-h-[252px] max-w-[216px]"
                          product={product}
                          isFavorite={false}
                        />
                      </li>
                    );
                  }
                )
              ) : (
                <li className="w-full">
                  <article className="min-h-[252px] max-h-[252px] max p-3 mb-3 flex flex-col items-center justify-center w-full">
                    <p className="text-lg font-semibold">
                      ¡Descubre algo nuevo! Explora nuestros productos y
                      encuentra algo que te encante.
                    </p>
                    <button
                      type="button"
                      className="px-4 py-2 mt-3 text-xs text-white uppercase rounded-xl bg-primaryColor"
                      aria-label="Ver productos"
                    >
                      Ver productos
                      <span className="sr-only">Ver productos</span>
                    </button>
                  </article>
                </li>
              )}
            </ul>
          </CarouselContainer>
        ) : (
          <div className="w-full">
            <article className="min-h-[252px] max-h-[252px] max p-3 mb-3 flex flex-col items-center justify-center w-full">
              <p className="text-lg font-semibold">
                ¡Descubre algo nuevo! Explora nuestros productos y encuentra
                algo que te encante.
              </p>
              <Link
                href={"/products"}
                className="px-4 py-2 mt-3 text-xs text-white uppercase rounded-xl bg-primaryColor"
                aria-label="Ver productos"
              >
                Ver productos
              </Link>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentSection;
