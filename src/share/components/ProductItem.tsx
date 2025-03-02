import { useRouter } from "next/navigation";

import { useAddRecentProduct } from "@/share/hook/useAddRecentProduct";

import ProductActionButtons from "@/share/components/ProductActionButtons";

import { calculateDiscountedPrice } from "@/share/utils/calculateDiscountedPrice";
import { splitPrice } from "@/share/utils/priceUtils";

import StarIcon from "@/icons/StarIcon";
import BoxIcon from "@/icons/BoxIcon";
import { useAuthStore } from "../hook/store/useAuth";

interface ProductItemInterface {
  isFavorite: boolean;
  classContainer: string;
  product: {
    productId: string;
    favoriteProductId?: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    averageRating: number;
    activeOffer: boolean;
    discountPercentage: number;
  };
}

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

const ProductItem = ({
  isFavorite,
  classContainer,
  product,
}: ProductItemInterface) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const mutationAddRecentProduct = useAddRecentProduct();

  const handleViewProductDetails = async () => {
    try {
      if (isAuthenticated) {
        await mutationAddRecentProduct.mutateAsync(product.productId);
      }
    } catch (error) {
      return;
    }
    router.push(`/products/${product.productId}`);
  };

  const discountedPrice = product.activeOffer
    ? calculateDiscountedPrice(product.price, product.discountPercentage)
    : product.price;

  const priceData = splitPrice(discountedPrice);
  const originalPriceData = splitPrice(product.price);

  return (
    <article
      className={`
        bg-white 
        p-3 rounded-xl
        cursor-pointer 
        relative overflow-hidden
        group
        ${classContainer}
      `}
      onClick={handleViewProductDetails}
      aria-labelledby={`product-title-${product.productId}`}
    >
      <div className="w-full h-[132px] flex items-center justify-center overflow-hidden">
        {backendDomain && product.image ? (
          <img
            src={backendDomain + product.image}
            alt={`Imagen de producto - ${product.name}`}
            className="object-contain w-full h-full"
          />
        ) : (
          <BoxIcon className="text-gray-400 size-20" />
        )}
      </div>

      <div>
        <div className="flex gap-3 mt-3 text-xs">
          <span>{product.brand}</span>
          {product.averageRating > 0 && (
            <div className="flex items-center gap-2">
              <StarIcon className="text-yellow-500 size-3" />
              <span className="text-xs">{product.averageRating}</span>
            </div>
          )}
        </div>
        <h3
          id={`product-title-${product.productId}`}
          className="inline-block w-full mt-2 text-sm font-bold truncate"
        >
          {product.name}
        </h3>
        {product.activeOffer ? (
          <div className="flex mt-4 gap-x-3">
            <div>
              <span className="text-base">${priceData.integerNumber}</span>,
              <span className="text-xs">{priceData.decimalNumber}</span>
            </div>
            <div>
              <span className="text-xs text-gray-600 line-through align-middle">
                ${originalPriceData.integerNumber}
              </span>
              ,
              <span className="text-xs text-gray-600 line-through align-middle">
                {originalPriceData.decimalNumber}
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <span>${priceData.integerNumber}</span>,
            <span className="text-xs">{priceData.decimalNumber}</span>
          </div>
        )}
      </div>
      {product.activeOffer && (
        <div className="absolute w-full text-xs text-center -rotate-45 top-[4%] left-0 -translate-x-[38%] bg-primaryColor font-bold text-white sm:left-0 sm:top-2 sm:-translate-x-[84px]">
          -{product.discountPercentage}%
        </div>
      )}
      <ProductActionButtons
        favoriteProductId={
          product.favoriteProductId ? product.favoriteProductId : ""
        }
        isFavorite={isFavorite}
        productId={product.productId}
      />
    </article>
  );
};

export default ProductItem;
