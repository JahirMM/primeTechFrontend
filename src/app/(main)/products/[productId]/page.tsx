import ProductFeatures from "@/productDetails/components/features/ProductFeatures";
import ProductDetails from "@/productDetails/components/ProductDetails";
import ReviewList from "@/review/components/ReviewList";

function page() {
  return (
    <>
      <ProductDetails />
      <ProductFeatures />
      <ReviewList />
    </>
  );
}

export default page;
