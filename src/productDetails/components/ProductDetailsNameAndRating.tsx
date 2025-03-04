import { useGetOffer } from "@/offer/hook/useGetOffer";
import StarIcon from "@/icons/StarIcon";

interface ProductDetailsNameAndRatingProps {
  averageRating: number;
  deviceType: string;
  productName: string;
  productPrice: number;
  productId: string;
}

function ProductDetailsNameAndRating({
  averageRating,
  deviceType,
  productName,
  productPrice,
  productId,
}: ProductDetailsNameAndRatingProps) {
  const { data: offerData } = useGetOffer(productId);

  const discountPercentage = offerData?.offer.discountPercentage || 0;
  const isOfferActive = offerData?.offer.active;
  const discountedPrice =
    productPrice - (productPrice * discountPercentage) / 100;

  return (
    <div className="px-5 mt-5 md:mt-0">
      <span className="block mb-4 text-xs text-gray-500">{deviceType}</span>
      {averageRating > 0 ? (
        <div className="flex mt-1 gap-x-3">
          <StarIcon className="text-yellow-500 size-3" />
          <span className="text-xs">{averageRating.toFixed(1)}</span>
        </div>
      ) : null}
      <h1 className="mt-2 text-2xl font-bold">{productName}</h1>

      {isOfferActive ? (
        <div className="sm:mt-6">
          <span className="inline-block my-7 text-lg font-bold mr-2">
            ${discountedPrice.toFixed(2)}
          </span>
          <span className="inline-block my-7 text-sm line-through text-gray-500">
            ${productPrice.toFixed(2)}
          </span>
          <span className="text-white ml-3 text-sm bg-red-500 px-2 py-2 rounded-lg">
            -{offerData.offer.discountPercentage}%
          </span>
        </div>
      ) : (
        <span className="inline-block my-7 text-base font-bold sm:mt-6">
          ${productPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
}

export default ProductDetailsNameAndRating;
