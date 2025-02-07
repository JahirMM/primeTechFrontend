import { useQuery } from "@tanstack/react-query";

import { GetSellerInformationResponseInterface } from "@/productDetails/interfaces/getSellerInformationResponseInterface";

import { getSellerInformation } from "@/productDetails/service/sellerInformationService";

export const useGetSellerInformation = (sellerId: string) => {
  return useQuery<GetSellerInformationResponseInterface, Error>({
    queryKey: ["sellerInformation", sellerId],
    queryFn: () => getSellerInformation(sellerId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
