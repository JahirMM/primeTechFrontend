import useRecentProducts from "@/share/hook/useRecentProducts";

import ProductActionButtons from "./ProductActionButtons";

import { splitPrice } from "@/share/utils/precioUtils";

import StarIcon from "@/icons/StarIcon";
import BoxIcon from "@/icons/BoxIcon";
import { useRouter } from "next/navigation";

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
  };
}

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

const ProductItem = ({
  isFavorite,
  classContainer,
  product,
}: ProductItemInterface) => {
  const router = useRouter();

  const { integerNumber, decimalNumber } = splitPrice(product.price);
  const { addProductToRecent } = useRecentProducts();

  const handleViewProductDetails = async () => {
    await addProductToRecent(product);
    router.push(`/products/${product.productId}`);
  };

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
        <div className="mt-4">
          <span>${integerNumber || 0}</span>.
          <span className="text-xs">{decimalNumber || "00"}</span>
        </div>
      </div>
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
