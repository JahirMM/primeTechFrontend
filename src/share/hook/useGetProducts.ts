import { useQuery } from "@tanstack/react-query";

import { ProductsResponse } from "@/share/interfaces/productInterface";

import { getProducts } from "@/share/services/productService";

interface ProductFilters {
  brand?: string;
  name?: string;
  categoryId?: string;
  sellerId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
  onSale?: boolean;
  minRating?: number;
}

export const useProducts = (filters: Partial<ProductFilters> = {}) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: true,
  });
};
