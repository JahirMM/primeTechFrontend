import { ProductInCart } from "./ProductInCardInterface";

export interface ShoppingCartInterface {
  shoppingCartId: string;
  createdAt: string;
  product: ProductInCart;
  completed: boolean;
}

export interface AddToCartResponseInterface {
  message: string;
  shoppingCart: ShoppingCartInterface;
}
