import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { deleteFavoriteProduct } from "@/share/services/favoriteProductService";

export function useDeleteFavoriteProduct() {
  const queryClient = useQueryClient();

  const mutationDeleteFavoriteProduct = useMutation({
    mutationFn: deleteFavoriteProduct,
    onSuccess: () => {
      toast.success("Producto eliminado como favorito", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["favoriteProducts"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      toast.error(error.response?.data.message, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });

  return mutationDeleteFavoriteProduct;
}
