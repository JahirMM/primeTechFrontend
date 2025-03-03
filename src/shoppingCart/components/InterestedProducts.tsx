import Link from "next/link";

import { useGetRecentProducts } from "@/share/hook/useGetRecentProducts";
import { useAuthStore } from "@/share/hook/store/useAuth";

import AuthMessageBox from "@/share/components/AuthMessageBox";
import ProductItem from "@/share/components/ProductItem";

function InterestedProducts() {
  const { isAuthenticated } = useAuthStore();
  const { data: listRecentProducts, isLoading: recentProductsLoading } =
    useGetRecentProducts(isAuthenticated);

  if (!isAuthenticated) {
    return (
      <AuthMessageBox className="mt-20 flex flex-col justify-center items-center" />
    );
  }

  if (recentProductsLoading) {
    return <div>cargando</div>;
  }

  return (
    <section className="mt-20">
      <p className="text-lg font-bold mb-5">Productos que te interesaron</p>
      <ul
        className="flex w-full gap-5 overflow-auto"
        aria-label="Lista de productos recientes"
      >
        {listRecentProducts && listRecentProducts.length > 0 ? (
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
