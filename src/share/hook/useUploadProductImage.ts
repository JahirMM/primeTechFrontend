import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { uploadProductImage } from "@/share/services/uploadProductImage";

export function useUploadProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      imageData,
    }: {
      productId: string;
      imageData: { file: File; isMain: boolean };
    }) => uploadProductImage(productId, imageData),
    onSuccess: (_, { productId }) => {
      toast.success("Imagen agregada", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["productImages", productId] });

      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      if (error.response?.status === 400) {
        toast.error("Por favor, ingresa una imagen menor a 1048576 bytes", {
          duration: 5000,
          style: { backgroundColor: "#a49248", color: "white" },
        });
      } else {
        toast.error(error.message, {
          duration: 5000,
          style: { backgroundColor: "#FF5353", color: "white" },
        });
      }
    },
  });
}
