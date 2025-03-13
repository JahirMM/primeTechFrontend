import { ProductsResponse } from "@/share/interfaces/productInterface";
import { useRouter } from "next/navigation";

import ProductItem from "@/share/components/ProductItem";

function ProductsList({ productList }: { productList: ProductsResponse }) {
  const router = useRouter();
  return (
    <section className="min-h-[calc(100vh-58px-52px)] mt-[56px] pb-3 pt-5 grid grid-cols-2 gap-x-5 gap-y-3 justify-items-center sm:grid-cols-3 px-5 md:px-16 lg:ml-60">
      {productList &&
      productList.products &&
      productList.products.length > 0 ? (
        productList.products.map((product) => (
          <ProductItem
            isFavorite={false}
            classContainer="w-full min-h-[252px] max-h-[252px] sm:min-w-[200px] sm:max-w-[200px]"
            product={product}
            key={product.productId}
          />
        ))
      ) : (
        <div className="w-full col-span-2 py-10 text-center sm:col-span-3">
          <p className="mb-5 text-xl font-bold">
            Lo sentimos, no se encontraron productos
          </p>
          <p className="mb-5 text-sm text-gray-600">
            Intenta ajustar tus filtros o explorar otras categorías.
          </p>
          <button
            type="button"
            className="px-3 py-2 text-sm text-white rounded-lg bg-primaryColor"
            onClick={() => router.push("/products")}
            aria-label="Borrar filtro"
          >
            Borrar Filtro
            <span className="sr-only">Borrar filtro</span>
          </button>
        </div>
      )}
    </section>
  );
}

export default ProductsList;
