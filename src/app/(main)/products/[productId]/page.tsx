"use client";

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
    return (
      <section className="mt-[58px] min-h-[calc(100vh-58px)] bg-red-400 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
      </section>
    );
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
