import { useQuery } from "@tanstack/react-query";

import { GetRecentProductsInterface } from "@/share/interfaces/getRecentProductsResponseInterface";

import { getRecentProducts } from "@/share/services/getRecentProduct";

export const useGetRecentProducts = (enabled: boolean) => {
  return useQuery<GetRecentProductsInterface, Error>({
    queryKey: ["recentProducts"],
    queryFn: () => getRecentProducts(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled,
  });
};
