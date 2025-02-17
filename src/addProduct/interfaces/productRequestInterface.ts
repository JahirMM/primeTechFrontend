import { Product } from "@/share/interfaces/productInterface";

export interface ProductRequestInterface
  extends Pick<Product, "name" | "description" | "brand" | "stock" | "price"> {
  category: string;
}
