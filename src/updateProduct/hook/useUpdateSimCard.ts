import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { UpdateSimCardInterface } from "@/updateProduct/interfaces/updateSimCardInterface";
import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { updateSimCard } from "@/updateProduct/services/updateSimCardService";

export function useUpdateSimCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      simCardId,
      simCardData,
    }: {
      simCardId: string;
      simCardData: UpdateSimCardInterface;
    }) => updateSimCard(simCardId, simCardData),
    onSuccess: () => {
      toast.success("Información actualizada", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["simCardInformation"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      toast.error(error.message, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });
}
