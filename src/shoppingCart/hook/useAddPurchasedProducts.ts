import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ProductPurchaseRequestInterface } from "@/shoppingCart/interfaces/productPurchaseRequestInterface";
import { addPurchasedProducts } from "@/shoppingCart/services/addPurchasedProducts";
import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

export function useAddPurchasedProducts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productsPurchased: ProductPurchaseRequestInterface[]) =>
      addPurchasedProducts(productsPurchased),
    onSuccess: () => {
      toast.success("Compra exitosa", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["productFromShoppingCart"] });
      queryClient.invalidateQueries({ queryKey: ["purchasedProduct"] });
      queryClient.invalidateQueries({ queryKey: ["soldProduct"] });
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
