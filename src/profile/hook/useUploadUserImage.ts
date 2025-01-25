import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";
import { uploadUserImage } from "@/profile/service/userImageService";

export function useUploadUserImage() {
  const queryClient = useQueryClient();

  const mutationUploadUserImage = useMutation({
    mutationFn: uploadUserImage,
    onSuccess: () => {
      toast.success("Imagen subida correctamente", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["userImage"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      toast.error(error.response?.data.message, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });

  return mutationUploadUserImage;
}
