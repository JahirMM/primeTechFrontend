import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";
import { addReview } from "@/review/services/addReviewService";

export function useAddReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      data,
    }: {
      productId: string;
      data: { rating: number; comment: string };
    }) => addReview(productId, data),
    onSuccess: () => {
      toast.success("Comentario agregado", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["productFromShoppingCart"] });
      queryClient.invalidateQueries({ queryKey: ["userProductReview"] });
      queryClient.invalidateQueries({ queryKey: ["favoriteProducts"] });
      queryClient.invalidateQueries({ queryKey: ["productDetails"] });
      queryClient.invalidateQueries({ queryKey: ["userProducts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      const errorMessage = error.response?.data.message || error.message;
      toast.error(errorMessage, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });
}
