import ProductQuantityControls from "@/shoppingCart/components/ProductQuantityControls";

import { ProductInCart } from "@/shoppingCart/interfaces/ProductInCardInterface";

import BoxIcon from "@/icons/BoxIcon";

interface ShoppingCartProductListProps {
  productsInCart: ProductInCart[];
  shoppingCartId: string;
}

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

function ShoppingCartProductList({
  productsInCart,
  shoppingCartId,
}: ShoppingCartProductListProps) {
  return (
    <div className="space-y-4 lg:col-start-1 lg:col-end-3">
      {productsInCart.map((product) => (
        <article
          key={product.productId}
          className="flex flex-col gap-5 p-3 bg-white shadow-md lg:items-center rounded-xl sm:flex-row sm:gap-0"
        >
          <div className="flex flex-1">
            {product.imgUrl ? (
              <img
                src={backendDomain + product.imgUrl}
                alt={product.name}
                className="object-cover w-20 h-20 rounded-lg"
              />
            ) : (
              <BoxIcon className="text-gray-500 size-20" />
            )}
            <div className="ml-4">
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-gray-600">Cantidad: {product.quantity}</p>
              <p className="font-bold text-primaryColor">
                ${(product.price * product.quantity).toFixed(2)}
              </p>
            </div>
          </div>
          <ProductQuantityControls
            productId={product.productId}
            shoppingCartId={shoppingCartId}
            quantity={product.quantity}
            stock={product.stock}
          />
        </article>
      ))}
    </div>
  );
}

export default ShoppingCartProductList;
