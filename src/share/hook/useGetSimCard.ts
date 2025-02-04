import { useQuery } from "@tanstack/react-query";

import { GetSimCardResponseInterface } from "@/share/interfaces/getSimCardResponseInterface";

import { getSimCard } from "@/share/services/getSimCardService";

export const useGetSimCard = (productId: string) => {
  return useQuery<GetSimCardResponseInterface, Error>({
    queryKey: ["simCardInformation", productId],
    queryFn: () => getSimCard(productId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
