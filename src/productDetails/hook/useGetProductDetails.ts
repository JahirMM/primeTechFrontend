import { useQuery } from "@tanstack/react-query";

import { GetProductDetailsResponseInterface } from "@/productDetails/interfaces/getProductDetailsResponseInterface";

import { getProductDetails } from "@/productDetails/service/productDetailsService";

export const useGetProductDetails = (productId: string) => {
  const { data, isLoading, error } = useQuery<
    GetProductDetailsResponseInterface,
    any
  >({
    queryKey: ["productDetails", productId],
    queryFn: () => getProductDetails(productId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: (failureCount, error: any) => {
      return ![400, 404].includes(error?.response?.status);
    },
  });

  return {
    data,
    isLoading,
    isNotFound:
      error?.response?.status === 404 || error?.response?.status === 400,
  };
};
