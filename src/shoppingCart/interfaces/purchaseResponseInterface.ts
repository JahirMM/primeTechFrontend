import { PurchasedProductInterface } from "@/shoppingCart/interfaces/purchasedProductInterface";

export interface PurchaseResponseInterface {
  message: string;
  purchasedProducts: PurchasedProductInterface[];
}
