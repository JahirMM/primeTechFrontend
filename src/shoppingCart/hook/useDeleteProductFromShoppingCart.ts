import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { deleteProductsFromTheShoppingCart } from "@/shoppingCart/services/shoppingCartService";

export function useDeleteProductFromShoppingCart() {
  const queryClient = useQueryClient();

  const mutationDeleteProductFromShoppingCart = useMutation({
    mutationFn: deleteProductsFromTheShoppingCart,
    onSuccess: () => {
      toast.success("Producto eliminado del carrito de compras", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["productFromShoppingCart"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      toast.error(error.response?.data.message, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });

  return mutationDeleteProductFromShoppingCart;
}
