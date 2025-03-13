import { useState } from "react";
import Link from "next/link";

import { PurchasedProductInterface } from "@/profile/interfaces/purchasedProductInterface";

import AddCommentForm from "@/profile/components/purchasedProducts/AddCommentForm";
import Modal from "@/share/components/Modal";

import { useCheckUserProductReview } from "@/profile/hook/useCheckUserProductReview";

import { splitPrice } from "@/share/utils/priceUtils";

import PlusIcon from "@/icons/PlusIcon";
import BoxIcon from "@/icons/BoxIcon";

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

function PurchasedProduct({ product }: { product: PurchasedProductInterface }) {
  const { data, isLoading } = useCheckUserProductReview(product.productId);

  const price = splitPrice(product.productPrice);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
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
            <p className="text-sm font-bold">
              <Link
                href={`/products/${product.productId}`}
                aria-label={product.productName}
              >
                {product.productName}
              </Link>
            </p>
            <span className="block mt-2 text-xs text-gray-500">
              ${price.integerNumber || 0},{price.decimalNumber || 0}
            </span>
            <span className="inline-block mb-5 text-xs text-gray-500">
              {product.purchaseQuantity} Unidad
            </span>
            <p className="text-xs text-gray-500 line-clamp-3 text-pretty">
              {product.productDescription}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-5 mt-6 sm:gap-0 sm:flex-row md:mt-0 md:ml-8 md:flex-1 2xl:ml-28">
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-gray-800 uppercase">
              {product.sellerName}
            </span>
            <Link
              href={`/products?sellerId=${product.sellerId}`}
              className="text-xs font-bold cursor-pointer text-primaryColor"
              aria-label="Productos del vendedor"
            >
              Sus productos
            </Link>
          </div>
          <div className="flex flex-row items-center gap-3 sm:flex-col">
            <Link
              href={`/products/${product.productId}`}
              aria-label="Volver a comprar"
            >
              <button
                type="button"
                className="px-3 py-2 text-xs text-white rounded-lg bg-primaryColor"
                aria-label="Volver a comprar"
              >
                Volver a comprar
                <span className="sr-only">Volver a comprar</span>
              </button>
            </Link>
            {isLoading ? (
              <div>Cargando</div>
            ) : (
              !data?.hasReview && (
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 px-3 py-2 text-xs transition-colors duration-300 border border-black rounded-lg hover:border-primaryColor hover:text-white hover:bg-primaryColor group"
                  onClick={() => setShowModal(true)}
                  aria-label="Editar"
                >
                  <PlusIcon className="text-black size-3 group-hover:text-white" />{" "}
                  comentario
                  <span className="sr-only">Editar</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <Modal title="Agregar comentario" onClose={() => setShowModal(false)}>
          <AddCommentForm productId={product.productId} />
        </Modal>
      )}
    </>
  );
}

export default PurchasedProduct;
