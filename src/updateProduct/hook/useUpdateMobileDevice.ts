import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { UpdateMobileDeviceInterface } from "@/updateProduct/interfaces/updateMobileDeviceInterface";
import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { updateMobileDevice } from "@/updateProduct/services/updateMobileDeviceService";

export function useUpdateMobileDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      mobileDeviceId,
      mobileDeviceData,
    }: {
      mobileDeviceId: string;
      mobileDeviceData: UpdateMobileDeviceInterface;
    }) => updateMobileDevice(mobileDeviceId, mobileDeviceData),
    onSuccess: () => {
      toast.success("Información actualizada", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["mobileDeviceInformation"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      toast.error(error.message, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });
}
