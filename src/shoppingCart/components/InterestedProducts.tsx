import { useEffect, useState } from "react";
import Link from "next/link";

import { Product } from "@/share/interfaces/productInterface";

import ProductItem from "@/share/components/ProductItem";

function InterestedProducts() {
  const [listRecentProducts, setListRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const recentProducts = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );
    setListRecentProducts(recentProducts);
  }, []);

  return (
    <section className="mt-20">
      <p className="text-lg font-bold mb-5">Productos que te interesaron</p>
      <ul
        className="flex w-full gap-5 overflow-auto"
        aria-label="Lista de productos recientes"
      >
        {listRecentProducts.length > 0 ? (
          listRecentProducts.map((product: Product) => (
            <li key={product.productId}>
              <ProductItem
                classContainer="mb-3 min-h-[252px] min-w-[216px] max-h-[252px] max-w-[216px]"
                product={product}
                isFavorite={false}
              />
            </li>
          ))
        ) : (
          <li className="w-full">
            <article className="min-h-[252px] flex flex-col items-center justify-center w-full p-3">
              <p className="text-lg font-semibold">
                ¡Descubre algo nuevo! Explora nuestros productos y encuentra
                algo que te encante.
              </p>
              <Link href="/products">
                <button className="px-4 py-2 mt-3 text-xs text-white uppercase rounded-xl bg-primaryColor">
                  Ver productos
                </button>
              </Link>
            </article>
          </li>
        )}
      </ul>
    </section>
  );
}

export default InterestedProducts;
