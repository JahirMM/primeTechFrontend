import { Product } from "@/share/interfaces/productInterface";

export interface AddProductInterface
  extends Pick<
    Product,
    | "productId"
    | "sellerId"
    | "name"
    | "description"
    | "brand"
    | "stock"
    | "price"
    | "deviceType"
    | "createdAt"
    | "updatedAt"
  > {
  category: string;
}

export interface AddProductResponseInterface {
  message: string;
  product: AddProductInterface;
}
