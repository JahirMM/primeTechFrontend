import { useQuery } from "@tanstack/react-query";

import { GetUserProductsResponse } from "@/profile/interfaces/getUserProductsResponseInterface";

import { getUserProducts } from "@/profile/service/userProductsService";

export const useGetUserProducts = (shouldFetch: boolean) => {
  return useQuery<GetUserProductsResponse, Error>({
    queryKey: ["userProducts"],
    queryFn: getUserProducts,
    enabled: shouldFetch,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
