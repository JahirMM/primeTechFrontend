import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { UpdateCameraInterface } from "@/updateProduct/interfaces/updateCameraInterface";
import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { updateCamera } from "@/updateProduct/services/updateCameraService";

export function useUpdateCamera() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cameraId,
      cameraData,
    }: {
      cameraId: string;
      cameraData: UpdateCameraInterface;
    }) => updateCamera(cameraId, cameraData),
    onSuccess: () => {
      toast.success("Información actualizada", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["cameraInformation"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      toast.error(error.message, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });
}
