import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";
import { AddBatteryInterface } from "@/addProduct/interfaces/addBatteryInterface";

import { addBattery } from "@/addProduct/service/addBatteryService";

export function useAddBattery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      batteryData,
    }: {
      productId: string;
      batteryData: AddBatteryInterface;
    }) => addBattery(productId, batteryData),
    onSuccess: () => {
      toast.success("Información agregada", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["batteryInformation"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      toast.error(error.message, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });
}
