import { useQuery } from "@tanstack/react-query";

import { AverageRatingResponse } from "@/share/interfaces/averageRatingResponseInterface";

import { getAverageRating } from "@/share/services/getAverageRatingService";

export const useGetAverageRating = (productId: string) => {
  return useQuery<AverageRatingResponse, Error>({
    queryKey: ["averageRating", productId],
    queryFn: () => getAverageRating(productId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
