import { ProductPurchaseRequestInterface } from "@/shoppingCart/interfaces/productPurchaseRequestInterface";
import { ProductInCart } from "@/shoppingCart/interfaces/ProductInCardInterface";

import { useCartPriceStore } from "@/share/hook/store/useShoppingCart";
import { useAddPurchasedProducts } from "../hook/useAddPurchasedProducts";
import { useDeleteProductFromShoppingCart } from "../hook/useDeleteProductFromShoppingCart";
import { toast } from "sonner";

interface PurchaseSummaryProps {
  cartIsEmpty: boolean;
  productsInCart: ProductInCart[];
}

function PurchaseSummary({
  cartIsEmpty,
  productsInCart,
}: PurchaseSummaryProps) {
  const mutationAddPurchasedProducts = useAddPurchasedProducts();
  const mutationDeleteProductFromShoppingCart =
    useDeleteProductFromShoppingCart();

  const { getTotalPrice } = useCartPriceStore();

  const shippingCost = 3000;
  const totalPrice = getTotalPrice() + shippingCost;

  const buyProducts = async () => {
    const shoppingList: ProductPurchaseRequestInterface[] = productsInCart.map(
      (product) => {
        return {
          productId: product.productId,
          purchaseQuantity: product.quantity,
        };
      }
    );
    try {
      await mutationAddPurchasedProducts.mutateAsync(shoppingList);
    } catch {
      toast.error("Ocurrió un error al agregar al producto.");
      return;
    }

    try {
      for (const product of shoppingList) {
        await mutationDeleteProductFromShoppingCart.mutateAsync(
          product.productId
        );
      }
    } catch {
      toast.error("Ocurrió un error al borrar el producto.");
      return;
    }
  };

  return (
    <article className="p-3 bg-white shadow-md rounded-xl lg:col-start-3 lg:col-end-4 lg:max-h-[240px]">
      <p className="py-4 text-sm font-semibold border-b border-gray-300">
        Resumen de compra
      </p>
      {cartIsEmpty ? (
        <p className="mt-4 text-xs text-gray-600">
          Aquí verás los importes de tu compra una vez que agregues productos.
        </p>
      ) : (
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Productos ({productsInCart.length})</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío</span>
            <span>${shippingCost}</span>
          </div>
          <div className="flex justify-between pt-2 font-bold border-t">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
          <button
            type="button"
            className="w-full px-4 py-2 mt-3 text-white uppercase rounded-xl bg-primaryColor"
            onClick={() => buyProducts()}
            aria-label="Comprar"
          >
            Comprar
            <span className="sr-only">Comprar</span>
          </button>
        </div>
      )}
    </article>
  );
}

export default PurchaseSummary;
