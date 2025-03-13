import ProductsPage from "@/products/components/ProductsPage";
import ProductListSkeleton from "@/products/skeletons/ProductListSkeleton";
import { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductsPage />
    </Suspense>
  );
}

export default page;
