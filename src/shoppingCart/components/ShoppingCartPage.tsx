"use client";

import ShoppingCartProductListSkeleton from "@/shoppingCart/skeletons/ShoppingCartProductListSkeleton";

import { useGetProductsFromShoppingCart } from "@/shoppingCart/hook/useGetProductsFromShoppingCart";

import ShoppingCartProductList from "@/shoppingCart/components/ShoppingCartProductList";
import InterestedProducts from "@/shoppingCart/components/InterestedProducts";
import EmptyCartMessage from "@/shoppingCart/components/EmptyCartMessage";
import PurchaseSummary from "@/shoppingCart/components/PurchaseSummary";

function ShoppingCartPage() {
  const { data, isLoading, isError } = useGetProductsFromShoppingCart();

  const productsInCart = data?.shoppingCart?.products || [];
  const cartIsEmpty =
    !isError && (data === null || productsInCart.length === 0);

  return (
    <section className="h-[calc(100vh-58px)] mt-[58px] pt-20 px-10 pb-20 bg-gray-100 flex flex-col overflow-auto">
      <section className="grid content-center flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        {isLoading ? (
          <ShoppingCartProductListSkeleton />
        ) : cartIsEmpty ? (
          <EmptyCartMessage />
        ) : (
          data && (
            <ShoppingCartProductList
              productsInCart={productsInCart}
              shoppingCartId={data.shoppingCart.shoppingCartId}
            />
          )
        )}

        <PurchaseSummary
          cartIsEmpty={cartIsEmpty}
          productsInCart={productsInCart}
        />
      </section>
      <InterestedProducts />
    </section>
  );
}

export default ShoppingCartPage;
