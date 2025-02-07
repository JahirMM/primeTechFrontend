import { ProductInCart } from "./ProductInCardInterface";

export interface ShoppingCartWithProductsInterface {
  shoppingCartId: string;
  createdAt: string;
  completed: boolean;
  products: ProductInCart[];
}

export interface GetShoppingCartResponseInterface {
  message: string;
  shoppingCart: ShoppingCartWithProductsInterface;
}
