import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { addFavoriteProduct } from "@/share/services/favoriteProductService";

export function useFavoriteProduct() {
  const mutationFavoriteProduct = useMutation({
    mutationFn: addFavoriteProduct,
    onSuccess: () => {
      toast.success("Producto agregado como favorito", {
        duration: 5000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      if (error.status == 409) {
        toast.error("Producto ya agregado como favorito", {
          duration: 5000,
          style: { backgroundColor: "#FF5353", color: "white" },
        });
      } else {
        toast.error(error.response?.data.message, {
          duration: 5000,
          style: { backgroundColor: "#FF5353", color: "white" },
        });
      }
    },
  });

  return mutationFavoriteProduct;
}
