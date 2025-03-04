import { useGetAverageRating } from "@/share/hook/useGetAverageRating";

import { GetProductDetailsResponseInterface } from "@/productDetails/interfaces/getProductDetailsResponseInterface";

import ProductDetailsNameAndRating from "@/productDetails/components/ProductDetailsNameAndRating";
import ProductDetailsCartControls from "@/productDetails/components/ProductDetailsCartControls";
import ProductDetailsSellerInfo from "@/productDetails/components/ProductDetailsSellerInfo";
import ProductDetailsImages from "@/productDetails/components/ProductDetailsImages";

interface ProductDetailsProps {
  productDetailsData: GetProductDetailsResponseInterface | undefined;
  productId: string;
}

function ProductDetails({
  productDetailsData,
  productId,
}: ProductDetailsProps) {
  const {
    data: averageRatingData,
    isLoading: isAverageRatingLoading,
    isError: hasAverageRatingError,
  } = useGetAverageRating(productId);

  return (
    <section className="mt-[58px] min-h-[calc(100vh-58px)] md:grid md:grid-cols-4 md:justify-center md:w-[95%] md:mx-auto">
      <ProductDetailsImages productId={productId} />

      <div className="md:col-start-3 md:col-end-5 md:grid md:grid-cols-1 md:content-center md:gap-y-5 md:max-w-[85%]">
        {productDetailsData && (
          <>
            <ProductDetailsNameAndRating
              averageRating={
                hasAverageRatingError
                  ? 0
                  : averageRatingData?.averageRating || 0
              }
              deviceType={productDetailsData.product.deviceType}
              productName={productDetailsData.product.name}
              productPrice={productDetailsData.product.price}
              productId={productId}
            />

            <ProductDetailsSellerInfo
              sellerId={productDetailsData.product.sellerId}
            />
            <ProductDetailsCartControls
              productId={productId}
              stock={productDetailsData.product.stock}
            />

            <div className="px-5 mt-5 text-sm text-pretty md:mt-0 md:row-start-2 md:row-end-3">
              {productDetailsData.product.description}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProductDetails;
