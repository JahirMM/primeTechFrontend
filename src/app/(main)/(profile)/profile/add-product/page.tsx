"use client";

import ProductManagerPageSkeleton from "@/share/skeletons/ProductManagerPageSkeleton";

import { useGetProductDetails } from "@/productDetails/hook/useGetProductDetails";

import ProductManagerPage from "@/productManager/components/ProductManagerPage";

import { getProductIdFromUrl } from "@/share/utils/getProductIdFromUrl";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const router = useRouter();
  const productIdFromUrl = getProductIdFromUrl();
  const {
    data: productDetails,
    isLoading: productDetailsLoading,
    isNotFound,
  } = productIdFromUrl
    ? useGetProductDetails(productIdFromUrl)
    : { data: null };

  useEffect(() => {
    if (isNotFound) {
      router.replace("/not_found");
    }
  }, [isNotFound, router]);

  if (productDetailsLoading || isNotFound) {
    return <ProductManagerPageSkeleton />;
  }

  return (
    <ProductManagerPage
      productIdFromUrl={productIdFromUrl}
      productDetails={productDetails || undefined}
    />
  );
}

export default Page;
