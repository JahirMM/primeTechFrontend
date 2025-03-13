import { useState } from "react";
import { useAddProductToShoppingCart } from "@/share/hook/useAddProductToShoppingCart";
import Link from "next/link";

interface ProductDetailsCartControlsProps {
  productId: string;
  stock: number;
}

function ProductDetailsCartControls({
  productId,
  stock,
}: ProductDetailsCartControlsProps) {
  const [quantity, setQuantity] = useState(1);
  const mutationShoppingCart = useAddProductToShoppingCart();

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    mutationShoppingCart.mutate({ productId, quantity });
  };

  return (
    <div className="flex items-center justify-between gap-5 px-5 mt-5 sm:justify-start md:mt-0">
      {stock > 0 ? (
        <>
          <div className="flex items-center px-3 py-2 bg-secondaryColor rounded-xl">
            <button
              type="button"
              className="px-2 text-lg font-bold"
              onClick={handleDecrease}
              disabled={quantity <= 1}
              aria-label="menos"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              type="button"
              className="px-2 text-lg font-bold"
              onClick={handleIncrease}
              disabled={quantity >= stock}
              aria-label="mas"
            >
              +
            </button>
          </div>
          <button
            type="button"
            aria-label="Agregar al carrito"
            className="px-3 py-2 text-white bg-primaryColor rounded-xl"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>
        </>
      ) : (
        <div className="text-center">
          <p className="text-sm font-bold text-red-600">Producto agotado</p>
          <p className="mt-2 text-sm text-gray-600">
            Pero no te preocupes, tenemos más productos increíbles para ti.
          </p>
          <Link href="/products" aria-label="Productos disponibles">
            <button
              type="button"
              className="px-4 py-2 mt-3 text-sm text-white rounded-lg bg-primaryColor"
              aria-label="Ver productos disponibles"
            >
              Ver productos disponibles
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsCartControls;
