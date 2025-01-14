import { Product } from "@/share/interfaces/productInterface";

import BoxIcon from "@/icons/BoxIcon";
import StarIcon from "@/icons/StarIcon";

import { splitPrice } from "@/share/utils/precioUtils";

import ProductActionButtons from "@/share/components/ProductActionButtons";
import useRecentProducts from "../hook/useRecentProducts";

interface ProductItemInterface {
  styleClass: string;
  product: Product;
}

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

function ProductItem({ styleClass, product }: ProductItemInterface) {
  const { integerNumber, decimalNumber } = splitPrice(product.price || 0);
  const { addProductToRecent } = useRecentProducts();

  const handleViewProductDetails = () => {
    console.log("VER PRODUCT");
    addProductToRecent(product);
  };

  return (
    <article
      className={`
        bg-white 
        min-h-[252px] min-w-[216px] max-h-[252px] max-w-[216px] 
        p-3 mb-3 rounded-xl
        cursor-pointer 
        relative overflow-hidden
        group
        ${styleClass}
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
        <div className="flex gap-3 mt-2 text-xs">
          <span>{product.brand}</span>
          {product.averageRating > 0 ? (
            <div className="flex items-center gap-2">
              <StarIcon className="text-yellow-500 size-3" />
              <span className="text-xs">{product.averageRating}</span>
            </div>
          ) : null}
        </div>
        <h3
          id={`product-title-${product.productId}`}
          className="inline-block w-full mt-2 text-base font-bold truncate"
        >
          {product.name}
        </h3>
        <div className="mt-2">
          <span>${integerNumber || 0}</span>.
          <span className="text-xs">{decimalNumber || "00"}</span>
        </div>
      </div>
      <ProductActionButtons />
    </article>
  );
}

export default ProductItem;
