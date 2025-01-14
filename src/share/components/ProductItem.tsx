import BoxIcon from "@/icons/BoxIcon";
import StarIcon from "@/icons/StarIcon";
import { Product } from "@/share/interfaces/productInterface";

import { splitPrice } from "@/share/utils/precioUtils";

interface ProductItemInterface {
  styleClass: string;
  product: Product;
}

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

function ProductItem({ styleClass, product }: ProductItemInterface) {
  const { integerNumber, decimalNumber } = splitPrice(product.price || 0);

  return (
    <article
      className={`bg-white min-h-[252px] min-w-[216px] max-h-[252px] max-w-[216px] p-3 rounded-xl ${styleClass} mb-3`}
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
          <BoxIcon className="size-20 text-gray-400" />
        )}
      </div>

      <div>
        <div className="flex gap-3 text-xs mt-2">
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
          className="inline-block mt-2 text-base font-bold truncate w-full"
        >
          {product.name}
        </h3>
        <div className="mt-2">
          <span>${integerNumber || 0}</span>.
          <span className="text-xs">{decimalNumber || "00"}</span>
        </div>
      </div>
    </article>
  );
}

export default ProductItem;
