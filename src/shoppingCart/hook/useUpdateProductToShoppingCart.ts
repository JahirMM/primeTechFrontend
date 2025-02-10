import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import {
  updateProductToShoppingCart,
} from "@/shoppingCart/services/shoppingCartService";

export function useUpdateProductToShoppingCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductToShoppingCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productFromShoppingCart"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      toast.error(error.message, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });
}
