import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";
import { AddCameraInterface } from "@/addProduct/interfaces/addCameraInterface";

import { addCamera } from "@/addProduct/service/addCameraService";

export function useAddCamera() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      cameraData,
    }: {
      productId: string;
      cameraData: AddCameraInterface;
    }) => addCamera(productId, cameraData),
    onSuccess: () => {
      toast.success("Información agregada", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["cameraInformation"] });
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
