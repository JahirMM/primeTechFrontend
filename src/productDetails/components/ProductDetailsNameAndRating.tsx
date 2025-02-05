import StarIcon from "@/icons/StarIcon";

interface ProductDetailsNameAndRatingProps {
  averageRating: number;
  deviceType: string;
  productName: string;
  productPrice: number;
}

function ProductDetailsNameAndRating({
  averageRating,
  deviceType,
  productName,
  productPrice,
}: ProductDetailsNameAndRatingProps) {
  return (
    <div className="px-5 mt-5 md:mt-0">
      <span className="block mb-4 text-xs text-gray-500">{deviceType}</span>
      {averageRating > 0 ? (
        <div className="flex mt-1 gap-x-3">
          <StarIcon className="text-yellow-500 size-3" />
          <span className="text-xs">4.2</span>
        </div>
      ) : null}
      <h1 className="mt-2 text-base font-bold">{productName}</h1>
      <span className="inline-block my-7 text-base font-bold sm:mt-6">
        ${productPrice}
      </span>
    </div>
  );
}

export default ProductDetailsNameAndRating;
