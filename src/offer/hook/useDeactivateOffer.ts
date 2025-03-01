import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { deactivateOffer } from "@/offer/service/deactivateOfferService";

export function useDeactivateOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ offerId }: { offerId: string }) =>
      deactivateOffer(offerId),
    onSuccess: () => {
      toast.success("Oferta desactivada", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["productOffer"] });
      queryClient.invalidateQueries({ queryKey: ["userProducts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      toast.error(error.message, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });
}
