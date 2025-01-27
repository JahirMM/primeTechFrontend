import { SoldProductInterface } from "@/profile/interfaces/soldProductInterface";
import BoxIcon from "@/icons/BoxIcon";

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

function SoldProduct({ soldProduct }: { soldProduct: SoldProductInterface }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-x-3">
      {soldProduct.productImg !== null ? (
        <img
          src={backendDomain + soldProduct.productImg}
          alt={`Imagen de producto - ${soldProduct.productName}`}
          className="mb-6 border border-gray-300 max-w-28 max-h-28 min-w-28 min-h-28"
        />
      ) : (
        <BoxIcon className="text-gray-400 border border-gray-300 max-w-20 max-h-20 min-w-20 min-h-20" />
      )}
      <div className="space-y-2">
        <span className="block text-lg font-bold">
          {soldProduct.productName}
        </span>
        <span className="block text-xs text-gray-500">
          {soldProduct.productPrice}
        </span>
        <span className="block text-xs text-gray-500">
          Cantiada: {soldProduct.purchaseQuantity}
        </span>
        <p className="text-xs text-gray-500 line-clamp-6 text-pretty">
          {soldProduct.productDescription}
        </p>
      </div>
    </div>
  );
}

export default SoldProduct;
