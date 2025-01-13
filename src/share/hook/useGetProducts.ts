import { useQuery } from "@tanstack/react-query";

import { ProductsResponse } from "@/share/interfaces/productInterface";

import { getProducts } from "@/share/services/productService";

export const useProducts = (filters: Record<string, any> = {}) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });
};
