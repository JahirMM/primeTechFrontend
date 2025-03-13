"use client";

import ProductManagerPageSkeleton from "@/share/skeletons/ProductManagerPageSkeleton";

import { useGetProductDetails } from "@/productDetails/hook/useGetProductDetails";

import ProductManagerPage from "@/productManager/components/ProductManagerPage";

import { useProductIdFromUrl } from "@/share/utils/useProductIdFromUrl";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const router = useRouter();
  const productIdFromUrl = useProductIdFromUrl();

  const {
    data: productDetails,
    isLoading: productDetailsLoading,
    isNotFound,
  } = useGetProductDetails(productIdFromUrl);

  useEffect(() => {
    if (isNotFound || productIdFromUrl === undefined) {
      router.replace("/not_found");
    }
  }, [isNotFound, productIdFromUrl, router]);

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
