import { useQuery } from "@tanstack/react-query";

import { GetOfferResponseInterface } from "@/share/interfaces/getOfferResponseInterface";
import { getOffer } from "@/share/services/getOfferService";

export const useGetOffer = (productId: string) => {
  return useQuery<GetOfferResponseInterface| null, Error>({
    queryKey: ["getOffer", productId],
    queryFn: () => getOffer(productId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
