"use client";

import { useState } from "react";

import ProductGeneralFeatures from "@/productDetails/components/features/ProductGeneralFeatures";
import ProductBatteryFeatures from "@/productDetails/components/features/ProductBatteryFeatures";
import ProductSimCardFeatures from "@/productDetails/components/features/ProductSimCardFeatures";
import ProductScreenFeatures from "@/productDetails/components/features/ProductScreenFeatures";
import ProductCameraFeatures from "@/productDetails/components/features/ProductCameraFeatures";

import { useGetProductDetails } from "@/productDetails/hook/useGetProductDetails";

import { getProductIdFromUrl } from "@/share/utils/getProductIdFromUrl";
import ChevronIcon from "@/icons/ChevronIcon";

function ProductFeatures() {
  const [showFeatures, setShowFeatures] = useState(false);
  const [productId] = useState(getProductIdFromUrl());

  if (!productId) {
    return <div>No se encontró un productId</div>;
  }

  const {
    data: productDetailsData,
    isLoading: isProductLoading,
  } = useGetProductDetails(productId);

  if (isProductLoading) {
    return (
      <div className="px-5 py-3 mt-10">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primaryColor"></div>
        </div>
      </div>
    );
  }

  if (!productDetailsData || !productDetailsData.product) {
    return <div>No se encontró la información del producto</div>;
  }

  return (
    <section>
      <div
        className={`flex items-center gap-3 px-5 mt-3 ${showFeatures ? "hidden" : "mb-3"}`}
        onClick={() => setShowFeatures(!showFeatures)}
      >
        <span className="text-sm font-bold cursor-pointer text-primaryColor">Ver todas las características</span>
        <ChevronIcon
          className={`size-3 transition-transform duration-700 ease-linear cursor-pointer ${
            showFeatures ? "rotate-90" : " rotate-0"
          }`}
        />
      </div>
      {showFeatures && (
        <div className="grid grid-cols-2 px-5 py-3 mt-10 gap-x-3 gap-y-8 sm:gap-x-40 sm:gap-y-16">
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
        </div>
      )}
    </section>
  );
}

export default ProductFeatures;
