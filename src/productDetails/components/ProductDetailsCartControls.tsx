import Link from "next/link";

interface ProductDetailsCartControlsProps {
  productId: string;
  stock: number;
}

function ProductDetailsCartControls({
  productId,
  stock,
}: ProductDetailsCartControlsProps) {
  return (
    <div className="flex items-center justify-between gap-5 px-5 mt-5 sm:justify-start md:mt-0">
      {stock > 0 ? (
        <>
          <div className="px-3 py-2 bg-secondaryColor rounded-xl">
            <button className="px-1 mr-2">-</button>
            <span className="px-1">3</span>
            <button className="px-1 ml-2">+</button>
          </div>
          <button className="px-3 py-2 text-white bg-primaryColor rounded-xl">
            Agregar al carrito
          </button>
        </>
      ) : (
        <div className="">
          <p className="text-sm font-bold text-red-600">Producto agotado</p>
          <p className="mt-2 text-sm text-gray-600">
            Pero no te preocupes, tenemos más productos increíbles para ti.
          </p>
          <Link href="/products">
            <button className="px-4 py-2 mt-3 text-sm text-white rounded-lg bg-primaryColor">
              Ver productos disponibles
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsCartControls;
