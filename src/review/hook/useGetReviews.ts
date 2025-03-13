import { useQuery } from "@tanstack/react-query";

import { GetReviewResponseInterface } from "@/review/interfaces/getReviewResponseInterface";
import { getReview } from "@/review/services/reviewService";

export const useGetReviews = (productId?: string) => {
  return useQuery<GetReviewResponseInterface, Error>({
    queryKey: ["review", productId],
    queryFn: () => {
      if (!productId) {
        return Promise.reject(new Error("No productId provided"));
      }
      return getReview(productId);
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
