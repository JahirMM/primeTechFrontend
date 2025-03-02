import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { addRecentProducts } from "@/share/services/addRecentProduct";

export function useAddRecentProduct() {
  const queryClient = useQueryClient();

  const mutationFavoriteProduct = useMutation({
    mutationFn: (productId: string) => addRecentProducts(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recentProducts"] });
      return;
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      toast.error(error.response?.data.message, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });

  return mutationFavoriteProduct;
}
