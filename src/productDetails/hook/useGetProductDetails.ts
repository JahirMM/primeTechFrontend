import { useQuery } from "@tanstack/react-query";

import { GetProductDetailsResponseInterface } from "@/productDetails/interfaces/ProductDetailsResponseInterface";

import { getProductDetails } from "@/productDetails/service/productDetailsService";

export const useGetProductDetails = (productId: string) => {
  return useQuery<GetProductDetailsResponseInterface, Error>({
    queryKey: ["productDetails", productId],
    queryFn: () => getProductDetails(productId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
