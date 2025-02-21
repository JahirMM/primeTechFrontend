import { Product } from "@/share/interfaces/productInterface";

export interface ProductDetailsInterface
  extends Omit<
    Product,
    | "image"
    | "categoryName"
    | "averageRating"
    | "discountPercentage"
    | "activeOffer"
  > {
  category: string;
}
