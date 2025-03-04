import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { deleteUserProduct } from "@/profile/service/deleteUserProductService";

export function useDeleteUserProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteUserProduct(productId),
    onSuccess: () => {
      toast.success("Product eliminado", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["productFromShoppingCart"] });
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
