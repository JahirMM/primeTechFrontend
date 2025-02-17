import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";
import { AddSimCardInterface } from "@/addProduct/interfaces/addSimCardInterface";

import { addSimCard } from "@/addProduct/service/addSimCardService";

export function useAddSimCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      mobileDeviceId,
      simCardData,
    }: {
      mobileDeviceId: string;
      simCardData: AddSimCardInterface;
    }) => addSimCard(mobileDeviceId, simCardData),
    onSuccess: () => {
      toast.success("Información agregada", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
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
