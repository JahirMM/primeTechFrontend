import { Product } from "@/share/interfaces/productInterface";

export interface PurchasedProductInterface
  extends Pick<
    Product,
    "productId" | "sellerId" | "name" | "description" | "price"
  > {
  purchaseId: string;
  purchaseQuantity: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImg: string | null;
  sellerName: string;
  sellerEmail: string;
}
