import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";
import { UpdateOfferInterface } from "@/offer/interface/updateOfferInterface";

import { updateOffer } from "@/offer/service/updateOfferService";

export function useUpdateOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      offerId,
      offerData,
    }: {
      offerId: string;
      offerData: UpdateOfferInterface;
    }) => updateOffer(offerId, offerData),
    onSuccess: () => {
      toast.success("Oferta actualizada", {
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
