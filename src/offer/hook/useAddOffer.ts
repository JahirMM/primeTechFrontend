import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";
import { AddOfferInterface } from "@/offer/interface/addOfferInterface";

import { addOffer } from "@/offer/service/addOfferService";

export function useAddOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      offerData,
    }: {
      productId: string;
      offerData: AddOfferInterface;
    }) => addOffer(productId, offerData),
    onSuccess: () => {
      toast.success("Oferta agregada", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["productOffer"] });
      queryClient.invalidateQueries({ queryKey: ["userProducts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      if (error.response?.status === 409) {
        toast.error("El producto ya tiene una oferta establecida", {
          duration: 5000,
          style: { backgroundColor: "#FF5353", color: "white" },
        });
      } else {
        toast.error(error.message, {
          duration: 5000,
          style: { backgroundColor: "#FF5353", color: "white" },
        });
      }
    },
  });
}
