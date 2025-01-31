import { ProductsResponse } from "@/share/interfaces/productInterface";
import ProductItem from "@/share/components/ProductItem";

function ProductsList({ productList }: { productList: ProductsResponse }) {

  return (
    <div className="mt-[56px] pb-3 grid grid-cols-2 gap-x-5 gap-y-3 justify-items-center sm:grid-cols-3 px-5 md:px-16 lg:ml-60">
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
        <div>No se encontraron productos</div>
      )}
    </div>
  );
}

export default ProductsList;
