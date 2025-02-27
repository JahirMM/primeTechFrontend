"use client";

import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ProductFeatures from "@/productDetails/components/features/ProductFeatures";
import ProductDetails from "@/productDetails/components/ProductDetails";
import ReviewList from "@/review/components/ReviewList";

import ProductDetailsSkeleton from "@/productDetails/skeletons/ProductDetailsSkeleton";

import { useGetProductDetails } from "@/productDetails/hook/useGetProductDetails";

import { getProductIdFromUrl } from "@/share/utils/getProductIdFromUrl";

function Page() {
  const router = useRouter();
  const productId = getProductIdFromUrl();

  if (!productId) {
    useEffect(() => {
      router.replace("/not_found");
    }, [router]);

    return null;
  }

  const {
    data: productDetailsData,
    isLoading: isProductLoading,
    isNotFound,
  } = useGetProductDetails(productId);

  useEffect(() => {
    if (isNotFound || productId === undefined) {
      router.replace("/not_found");
    }
  }, [isNotFound, router]);

  if (isProductLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isNotFound) {
    return <div>Redirigiendo a página no encontrada...</div>;
  }

  return (
    <>
      <ProductDetails
        productDetailsData={productDetailsData}
        productId={productId}
      />
      <ProductFeatures />
      <ReviewList />
    </>
  );
}

export default Page;
