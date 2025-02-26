import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { AddMobileDeviceInterface } from "@/addProduct/interfaces/addMobileDeviceInterface";
import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { addMobileDevice } from "@/addProduct/service/addMobileDeviceService";

export function useAddMobileDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      mobileDeviceData,
    }: {
      productId: string;
      mobileDeviceData: AddMobileDeviceInterface;
    }) => addMobileDevice(productId, mobileDeviceData),
    onSuccess: () => {
      toast.success("Información agregada", {
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
