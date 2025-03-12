import { useQuery } from "@tanstack/react-query";
import { GetProductDetailsResponseInterface } from "@/productDetails/interfaces/getProductDetailsResponseInterface";
import { getProductDetails } from "@/productDetails/service/productDetailsService";
import { AxiosError } from "axios";

export const useGetProductDetails = (productId: string | null | undefined) => {
  const isValidProductId = Boolean(
    productId && /^[a-f0-9-]{36}$/.test(productId)
  );

  const { data, isLoading, error } = useQuery<
    GetProductDetailsResponseInterface,
    AxiosError<{ response: { status: number } }>
  >({
    queryKey: ["productDetails", productId],
    queryFn: isValidProductId
      ? () => getProductDetails(productId as string)
      : () => Promise.reject({ response: { status: 400 } }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: isValidProductId,
  });

  return {
    data,
    isLoading,
    isNotFound:
      !!error &&
      error?.response?.status != null &&
      [400, 404].includes(error?.response?.status),
  };
};
