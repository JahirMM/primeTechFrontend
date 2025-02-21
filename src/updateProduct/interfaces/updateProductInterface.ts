import { Product } from "@/share/interfaces/productInterface";

export interface UpdateProductInterface
  extends Pick<Product, "name" | "description" | "brand" | "stock" | "price"> {
  category: string;
}
