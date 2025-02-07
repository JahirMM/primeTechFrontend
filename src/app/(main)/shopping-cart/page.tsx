"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useDeleteProductFromShoppingCart } from "@/share/hook/useDeleteProductFromShoppingCart";
import { useGetProductsFromShoppingCart } from "@/share/hook/useGetProductsFromShoppingCart";

import { Product } from "@/share/interfaces/productInterface";
import ProductItem from "@/share/components/ProductItem";

import CartShoppingIcon from "@/icons/CartShoppingIcon";
import BoxIcon from "@/icons/BoxIcon";
import { useUpdateProductToShoppingCart } from "@/share/hook/useUpdateProductToShoppingCart";

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

function ShoppingCartPage() {
  const [listRecentProducts, setListRecentProducts] = useState<Product[]>([]);
  const mutationDeleteProductFromShoppingCart =
    useDeleteProductFromShoppingCart();
  const mutationUpdateProductFromShoppingCart =
    useUpdateProductToShoppingCart();
  const { data, isLoading, isError } = useGetProductsFromShoppingCart();

  useEffect(() => {
    const recentProducts = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );
    setListRecentProducts(recentProducts);
  }, []);

  const shippingCost = 3000;
  const productsInCart = data?.shoppingCart?.products || [];
  const cartIsEmpty = !isLoading && !isError && productsInCart.length === 0;

  const totalProductPrice = productsInCart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const totalPrice = totalProductPrice + shippingCost;

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
    <div className="mt-[58px] pt-20 px-10 bg-gray-100">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Mensaje cuando el carrito está vacío */}
        {cartIsEmpty && (
          <div className="flex flex-col p-3 bg-white shadow-md rounded-xl sm:flex-row sm:items-center lg:col-start-1 lg:col-end-3">
            <div className="flex items-center flex-1 gap-5 mb-5 sm:mb-0">
              <CartShoppingIcon className="size-20" />
              <div>
                <p className="text-lg font-bold">
                  Tu carrito de compras está vacío
                </p>
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
          </div>
        )}

        {/* Lista de productos en el carrito */}
        {!cartIsEmpty && data && (
          <div className="space-y-4 lg:col-start-1 lg:col-end-3">
            {productsInCart.map((product) => (
              <div
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
                  {/* Detalles del producto */}
                  <div className="ml-4">
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p className="text-gray-600">
                      Cantidad: {product.quantity}
                    </p>
                    <p className="font-bold text-primaryColor">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Botón para disminuir cantidad */}
                  <div>
                    <button
                      className="px-2 py-1 text-sm bg-gray-300 rounded disabled:opacity-50"
                      onClick={() =>
                        updateProductQuantity(
                          product.productId,
                          data.shoppingCart.shoppingCartId,
                          product.quantity - 1
                        )
                      }
                      disabled={product.quantity === 1}
                    >
                      -
                    </button>
                  </div>

                  <span className="px-2">{product.quantity}</span>

                  {/* Botón para aumentar cantidad */}
                  <div>
                    <button
                      className="px-2 py-1 text-sm bg-gray-300 rounded"
                      onClick={() =>
                        updateProductQuantity(
                          product.productId,
                          data.shoppingCart.shoppingCartId,
                          product.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Botón para eliminar producto */}
                  <div>
                    <button
                      className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-700"
                      onClick={() => deleteProduct(product.productId)}
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resumen de compra */}
        <div className="p-3 bg-white shadow-md rounded-xl lg:col-start-3 lg:col-end-4 lg:max-h-[240px]">
          <p className="py-4 text-sm font-semibold border-b border-gray-300">
            Resumen de compra
          </p>
          {cartIsEmpty ? (
            <p className="mt-4 text-xs text-gray-600">
              Aquí verás los importes de tu compra una vez que agregues
              productos.
            </p>
          ) : (
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Productos ({productsInCart.length})</span>
                <span>${totalProductPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>${shippingCost}</span>
              </div>
              <div className="flex justify-between pt-2 font-bold border-t">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
              <button className="w-full px-4 py-2 mt-3 text-white uppercase rounded-xl bg-primaryColor">
                Comprar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Productos recientes */}
      <ul
        className="flex w-full gap-5 mt-20 overflow-auto"
        aria-label="Lista de productos recientes"
      >
        {listRecentProducts.length > 0 ? (
          listRecentProducts.map((product: Product) => (
            <li key={product.productId}>
              <ProductItem
                classContainer="mb-3 min-h-[252px] min-w-[216px] max-h-[252px] max-w-[216px]"
                product={product}
                isFavorite={false}
              />
            </li>
          ))
        ) : (
          <li className="w-full">
            <article className="min-h-[252px] flex flex-col items-center justify-center w-full p-3">
              <p className="text-lg font-semibold">
                ¡Descubre algo nuevo! Explora nuestros productos y encuentra
                algo que te encante.
              </p>
              <Link href="/products">
                <button className="px-4 py-2 mt-3 text-xs text-white uppercase rounded-xl bg-primaryColor">
                  Ver productos
                </button>
              </Link>
            </article>
          </li>
        )}
      </ul>
    </div>
  );
}

export default ShoppingCartPage;
