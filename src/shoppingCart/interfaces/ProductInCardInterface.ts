import { Product } from "@/share/interfaces/productInterface";

export interface ProductInCart
  extends Omit<
    Product,
    | "sellerId"
    | "description"
    | "categoryName"
    | "deviceType"
    | "averageRating"
    | "discountPercentage"
    | "activeOffer"
    | "createdAt"
    | "updatedAt"
  > {
  imgUrl: string;
  quantity: number;
}
