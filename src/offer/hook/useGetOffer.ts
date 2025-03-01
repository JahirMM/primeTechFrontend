import { useQuery } from "@tanstack/react-query";

import { GetOfferResponseInterface } from "@/offer/interface/getOfferResponseInterface";

import { getOffer } from "@/offer/service/getOfferService";

export const useGetOffer = (productId: string) => {
  return useQuery<GetOfferResponseInterface | null, Error>({
    queryKey: ["productOffer", productId],
    queryFn: () => getOffer(productId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
