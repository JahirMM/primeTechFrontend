"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ProductFeatures from "@/productDetails/components/features/ProductFeatures";
import ProductDetails from "@/productDetails/components/ProductDetails";
import ReviewList from "@/review/components/ReviewList";

import ProductDetailsSkeleton from "@/productDetails/skeletons/ProductDetailsSkeleton";

import { useGetProductDetails } from "@/productDetails/hook/useGetProductDetails";
import { useProductIdFromUrl } from "@/share/utils/useProductIdFromUrl";

function Page() {
  const router = useRouter();
  const productId = useProductIdFromUrl();
  const isValidProductId = Boolean(
    productId && /^[a-f0-9-]{36}$/.test(productId)
  );

  useEffect(() => {
    if (!isValidProductId) {
      router.replace("/not_found");
    }
  }, [isValidProductId, router]);

  const {
    data: productDetailsData,
    isLoading: isProductLoading,
    isNotFound,
  } = useGetProductDetails(isValidProductId ? productId : null);

  useEffect(() => {
    if (isNotFound) {
      router.replace("/not_found");
    }
  }, [isNotFound, router]);

  if (!isValidProductId || isNotFound) {
    return null;
  }

  if (isProductLoading) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <>
      <ProductDetails
        productDetailsData={productDetailsData}
        productId={productId!}
      />
      <ProductFeatures />
      <ReviewList />
    </>
  );
}

export default Page;
