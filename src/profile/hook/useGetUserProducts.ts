import { useQuery } from "@tanstack/react-query";

import { GetUserProductsResponse } from "@/profile/interfaces/getUserProductsResponseInterface";

import { getUserProducts } from "@/profile/service/userProductsService";

export const useGetUserProducts = () => {
  return useQuery<GetUserProductsResponse, Error>({
    queryKey: ["userProducts"],
    queryFn: getUserProducts,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
