import ProductQuantityControls from "@/shoppingCart/components/ProductQuantityControls";
import { ProductInCart } from "@/shoppingCart/interfaces/ProductInCardInterface";

import { useGetOffer } from "@/share/hook/useGetOffer";

import BoxIcon from "@/icons/BoxIcon";
import { useCartPriceStore } from "@/share/hook/store/useShoppingCart";
import { useEffect } from "react";

interface ProductInCartProps {
  product: ProductInCart;
  shoppingCartId: string;
}

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

function ProductInShoppingCart({
  product,
  shoppingCartId,
}: ProductInCartProps) {
  const { data } = useGetOffer(product.productId);
  const { addPrice, removePrice } = useCartPriceStore();

  const unitPrice = (
    data?.offer?.active
      ? product.price * (1 - data.offer.discountPercentage / 100)
      : product.price
  ).toFixed(2);

  const totalPrice = Number(
    (
      (data?.offer?.active
        ? product.price * (1 - data.offer.discountPercentage / 100)
        : product.price) * product.quantity
    ).toFixed(2)
  );

  useEffect(() => {
    addPrice(totalPrice);

    return () => {
      removePrice(totalPrice);
    };
  }, [totalPrice]);

  return (
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
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <p className="text-lg font-semibold">{product.name}</p>
            {!data || !data.offer?.active ? null : (
              <span className="px-3 py-1 text-xs text-white rounded-md bg-primaryColor">
                -{data.offer.discountPercentage}%
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">Cantidad: {product.quantity}</p>
          {data === null ? (
            <p className="text-sm text-gray-600">unidad: ${product.price}</p>
          ) : (
            data &&
            data.offer &&
            data.offer.active && (
              <div>
                <span className="text-sm text-gray-600">Unidad: </span>
                <span className="text-sm text-gray-600">${unitPrice}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            )
          )}
          <p className="font-bold text-primaryColor">${totalPrice}</p>
        </div>
      </div>
      <ProductQuantityControls
        productId={product.productId}
        shoppingCartId={shoppingCartId}
        quantity={product.quantity}
        stock={product.stock}
      />
    </article>
  );
}

export default ProductInShoppingCart;
