"use client";

import ProductGeneralFeatures from "@/productDetails/components/features/ProductGeneralFeatures";
import ProductBatteryFeatures from "@/productDetails/components/features/ProductBatteryFeatures";
import ProductSimCardFeatures from "@/productDetails/components/features/ProductSimCardFeatures";
import ProductScreenFeatures from "@/productDetails/components/features/ProductScreenFeatures";

import { useGetProductDetails } from "@/productDetails/hook/useGetProductDetails";

import { getProductIdFromUrl } from "@/share/utils/getProductIdFromUrl";
import ProductCameraFeatures from "./ProductCameraFeatures";

function ProductFeatures() {
  const productId = getProductIdFromUrl();

  if (!productId) {
    return <div>No se encontró un productId</div>;
  }

  const {
    data: productDetailsData,
    isLoading: isProductLoading,
    isError: hasProductError,
  } = useGetProductDetails(productId);

  if (isProductLoading) {
    return <div>Cargando...</div>;
  }

  if (hasProductError) {
    return <div>Error</div>;
  }

  if (!productDetailsData || !productDetailsData.product) {
    return <div>No se encontró la información del producto</div>;
  }

  return (
    <section className="grid grid-cols-2 px-5 py-3 mt-10 gap-x-3 gap-y-8 sm:gap-x-40 sm:gap-y-16">
      <ProductGeneralFeatures
        productId={productId}
        deviceType={productDetailsData.product.deviceType}
      />
      {(productDetailsData.product.deviceType === "mobile" ||
        productDetailsData.product.deviceType === "laptop") && (
        <>
          <ProductScreenFeatures productId={productId} />
          <ProductBatteryFeatures productId={productId} />
        </>
      )}

      {productDetailsData.product.deviceType === "mobile" && (
        <ProductSimCardFeatures productId={productId} />
      )}

      {(productDetailsData.product.deviceType === "mobile" ||
        productDetailsData.product.deviceType === "laptop") && (
        <ProductCameraFeatures productId={productId} />
      )}
    </section>
  );
}

export default ProductFeatures;
