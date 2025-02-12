import React from "react";

import ProductInShoppingCart from "@/shoppingCart/components/ProductInShoppingCart";
import { ProductInCart } from "@/shoppingCart/interfaces/ProductInCardInterface";

interface ShoppingCartProductListProps {
  productsInCart: ProductInCart[];
  shoppingCartId: string;
}

function ShoppingCartProductList({
  productsInCart,
  shoppingCartId,
}: ShoppingCartProductListProps) {
  return (
    <div className="space-y-4 lg:col-start-1 lg:col-end-3">
      {productsInCart.map((product) => (
        <ProductInShoppingCart
          key={product.productId}
          product={product}
          shoppingCartId={shoppingCartId}
        />
      ))}
    </div>
  );
}

export default ShoppingCartProductList;
