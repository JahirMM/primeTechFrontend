import { useQuery } from "@tanstack/react-query";

import { GetReviewResponseInterface } from "@/review/interfaces/getReviewResponseInterface";
import { getReview } from "@/review/services/reviewService";

export const useGetReviews = (productId: string) => {
  return useQuery<GetReviewResponseInterface, Error>({
    queryKey: ["review", productId],
    queryFn: () => getReview(productId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
