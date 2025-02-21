import { Product } from "@/share/interfaces/productInterface";

type ProductResponse = Omit<
  Product,
  | "image"
  | "categoryName"
  | "averageRating"
  | "discountPercentage"
  | "activeOffer"
> & {
  category: string;
};

export interface UpdateProductResponseInterface {
  message: string;
  product: ProductResponse;
}
