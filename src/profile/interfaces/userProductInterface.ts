import { Product } from "@/share/interfaces/productInterface";

export interface UserProductInterface
  extends Omit<
    Product,
    "sellerId" | "averageRating" | "discountPercentage" | "activeOffer"
  > {}
