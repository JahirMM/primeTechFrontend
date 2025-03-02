import { Product } from "@/share/interfaces/productInterface";

export interface RecentProducts
  extends Pick<
    Product,
    | "productId"
    | "name"
    | "brand"
    | "price"
    | "averageRating"
    | "activeOffer"
    | "discountPercentage"
  > {
  imageUrl: string;
}
