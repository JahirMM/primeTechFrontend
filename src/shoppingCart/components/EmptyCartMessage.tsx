import CartShoppingIcon from "@/icons/CartShoppingIcon";
import Link from "next/link";

function EmptyCartMessage() {
  return (
    <article className="flex flex-col p-3 bg-white shadow-md rounded-xl sm:flex-row sm:items-center lg:col-start-1 lg:col-end-3">
      <div className="flex items-center flex-1 gap-5 mb-5 sm:mb-0">
        <CartShoppingIcon className="size-20" />
        <div>
          <p className="text-lg font-bold">Tu carrito de compras está vacío</p>
          <p className="text-sm text-gray-600">
            Agrega productos para aprovechar nuestras ofertas
          </p>
        </div>
      </div>
      <Link
        href="/products"
        className="text-sm font-bold cursor-pointer text-primaryColor"
      >
        Descubrir productos
      </Link>
    </article>
  );
}

export default EmptyCartMessage;
