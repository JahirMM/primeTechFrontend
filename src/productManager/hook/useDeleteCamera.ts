import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { deleteCamera } from "@/productManager/services/deleteCamera";

export function useDeleteCamera() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cameraId }: { cameraId: string }) => deleteCamera(cameraId),
    onSuccess: () => {
      toast.success("Camara eliminada", {
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
