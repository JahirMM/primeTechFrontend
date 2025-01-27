import { PurchasedProductInterface } from "./purchasedProductInterface";

export interface OrderInterface {
  orderId: string;
  orderDate: string;
  status: string;
  products: PurchasedProductInterface[];
}
