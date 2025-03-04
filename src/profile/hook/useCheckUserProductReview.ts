import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";
import { checkUserProductReview } from "@/profile/service/getUserProductReviewStatus";

export const useCheckUserProductReview = (productId: string) => {
  return useQuery<{ hasReview: boolean }, AxiosError<ErrorResponseInterface>>({
    queryKey: ["userProductReview", productId],
    queryFn: () => checkUserProductReview(productId),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
