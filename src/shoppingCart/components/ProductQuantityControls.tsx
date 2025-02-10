import { useDeleteProductFromShoppingCart } from "@/shoppingCart/hook/useDeleteProductFromShoppingCart";
import { useUpdateProductToShoppingCart } from "@/shoppingCart/hook/useUpdateProductToShoppingCart";

interface ProductQuantityControlsProps {
  productId: string;
  shoppingCartId: string;
  quantity: number;
}

function ProductQuantityControls({
  productId,
  shoppingCartId,
  quantity,
}: ProductQuantityControlsProps) {
  const mutationDeleteProductFromShoppingCart =
    useDeleteProductFromShoppingCart();
  const mutationUpdateProductFromShoppingCart =
    useUpdateProductToShoppingCart();

  const deleteProduct = (productId: string) => {
    mutationDeleteProductFromShoppingCart.mutate(productId);
  };

  const updateProductQuantity = (
    productId: string,
    shoppingCartId: string,
    quantity: number
  ) => {
    if (quantity < 1) return;
    mutationUpdateProductFromShoppingCart.mutate({
      productId,
      shoppingCartId,
      quantity,
    });
  };
  return (
    <div className="flex items-center gap-2">
      <div>
        <button
          className="px-2 py-1 text-sm bg-gray-300 rounded disabled:opacity-50"
          onClick={() =>
            updateProductQuantity(productId, shoppingCartId, quantity - 1)
          }
          disabled={quantity === 1}
        >
          -
        </button>
      </div>

      <span className="px-2">{quantity}</span>

      <div>
        <button
          className="px-2 py-1 text-sm bg-gray-300 rounded"
          onClick={() =>
            updateProductQuantity(productId, shoppingCartId, quantity + 1)
          }
        >
          +
        </button>
      </div>

      <div>
        <button
          className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-700"
          onClick={() => deleteProduct(productId)}
        >
          Borrar
        </button>
      </div>
    </div>
  );
}

export default ProductQuantityControls;
