import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { addProductToShoppingCart } from "@/shoppingCart/services/shoppingCartService";

export function useAddProductToShoppingCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProductToShoppingCart,
    onSuccess: () => {
      toast.success("Producto agregado al carrito de compras", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["productFromShoppingCart"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      if (error.response?.status === 409) {
        toast.error(
          "No puedes agregar más de la cantidad disponible en stock",
          {
            duration: 5000,
            style: { backgroundColor: "#FF5353", color: "white" },
          }
        );
      } else {
        toast.error(error.message, {
          duration: 5000,
          style: { backgroundColor: "#FF5353", color: "white" },
        });
      }
    },
  });
}
