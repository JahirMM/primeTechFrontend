import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { UpdateBatteryInterface } from "@/updateProduct/interfaces/updateBatteryInterface";
import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { updateBattery } from "@/updateProduct/services/updateBatteryService";

export function useUpdateBattery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      batteryId,
      batteryData,
    }: {
        batteryId: string;
      batteryData: UpdateBatteryInterface;
    }) => updateBattery(batteryId, batteryData),
    onSuccess: () => {
      toast.success("Información actualizada", {
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
