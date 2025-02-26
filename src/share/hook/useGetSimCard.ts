import { useQuery } from "@tanstack/react-query";
import { GetSimCardResponseInterface } from "@/share/interfaces/getSimCardResponseInterface";
import { getSimCard } from "@/share/services/getSimCardService";

export const useGetSimCard = (productId: string) => {
  return useQuery<GetSimCardResponseInterface | null, Error>({
    queryKey: ["simCardInformation", productId],
    queryFn: () => {
      if (!productId) return Promise.reject(new Error("No productId provided"));
      return getSimCard(productId);
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

