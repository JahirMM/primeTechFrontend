"use client";

import { useGetProductDetails } from "@/productDetails/hook/useGetProductDetails";
import { useGetAverageRating } from "@/share/hook/useGetAverageRating";

import ProductDetailsNameAndRating from "@/productDetails/components/ProductDetailsNameAndRating";
import ProductDetailsCartControls from "@/productDetails/components/ProductDetailsCartControls";
import ProductDetailsSellerInfo from "@/productDetails/components/ProductDetailsSellerInfo";
import ProductDetailsImages from "@/productDetails/components/ProductDetailsImages";

import { getProductIdFromUrl } from "@/share/utils/getProductIdFromUrl";

function ProductDetails() {
  const productId = getProductIdFromUrl();

  if (!productId) {
    return <div>No se encontró un productId</div>;
  }

  const {
    data: productDetailsData,
    isLoading: isProductLoading,
    isError: hasProductError,
  } = useGetProductDetails(productId);

  const {
    data: averageRatingData,
    isLoading: isAverageRatingLoading,
    isError: hasAverageRatingError,
  } = useGetAverageRating(productId);

  if (isProductLoading && isAverageRatingLoading) {
    return <div>Cargando...</div>;
  }

  if (hasProductError && !productDetailsData?.product) {
    return <div>Error cargando los detalles del producto</div>;
  }

  if (!productDetailsData?.product) {
    return <div>El producto no fue encontrado</div>;
  }

  return (
    <section className="mt-[58px] min-h-[calc(100vh-58px)] md:grid md:grid-cols-4 md:justify-center md:w-[95%] md:mx-auto">
      <ProductDetailsImages productId={productId} />

      <div className="md:col-start-3 md:col-end-5 md:grid md:grid-cols-1 md:content-center md:gap-y-5 md:max-w-[85%]">
        <ProductDetailsNameAndRating
          averageRating={
            hasAverageRatingError ? 0 : averageRatingData?.averageRating || 0
          }
          deviceType={productDetailsData.product.deviceType}
          productName={productDetailsData.product.name}
          productPrice={productDetailsData.product.price}
        />

        <ProductDetailsSellerInfo />
        <ProductDetailsCartControls
          productId={productId}
          stock={productDetailsData.product.stock}
        />

        <div className="px-5 mt-5 text-sm text-pretty md:mt-0 md:row-start-2 md:row-end-3">
          {productDetailsData.product.description}
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
