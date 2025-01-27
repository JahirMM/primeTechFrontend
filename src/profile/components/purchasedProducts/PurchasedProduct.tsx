import { PurchasedProductInterface } from "@/profile/interfaces/purchasedProductInterface";
import { splitPrice } from "@/share/utils/precioUtils";
import BoxIcon from "@/icons/BoxIcon";

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

function PurchasedProduct({ product }: { product: PurchasedProductInterface }) {
  const price = splitPrice(product.productPrice);

  return (
    <div className="flex flex-col gap-y-4 md:justify-betweend md:flex-row md:gap-x-0">
      <div className="flex gap-x-4 md:flex-1">
        {product.productImg !== null ? (
          <img
            src={backendDomain + product.productImg}
            alt={`Imagen de producto - ${product.productName}`}
            className="border border-gray-300 max-w-20 max-h-20 min-w-20 min-h-20"
          />
        ) : (
          <BoxIcon className="text-gray-400 border border-gray-300 max-w-20 max-h-20 min-w-20 min-h-20" />
        )}
        <div>
          <p className="text-sm font-bold">{product.productName}</p>
          <span className="block mt-2 text-xs text-gray-500">
            ${price.integerNumber || 0}.{price.decimalNumber || 0}
          </span>
          <span className="inline-block mb-5 text-xs text-gray-500">
            {product.purchaseQuantity} Unidad
          </span>
          <p className="text-xs text-gray-500 line-clamp-3 text-pretty">
            {product.productDescription}
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-6 md:mt-0 md:ml-8 md:flex-1 2xl:ml-28">
        <div className="flex flex-col space-y-2">
          <span className="text-xs text-gray-800 uppercase">
            {product.sellerName}
          </span>
          <span className="text-xs font-bold cursor-pointer text-primaryColor">
            Sus productos
          </span>
        </div>
        <div className="">
          <button className="px-3 py-2 text-xs text-white rounded-lg bg-primaryColor">
            Volver a comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchasedProduct;
