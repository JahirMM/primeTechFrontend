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
  const cartIsEmpty = !isError && productsInCart.length === 0;

  return (
    <section className="mt-[58px] pt-20 px-10 bg-gray-100">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
