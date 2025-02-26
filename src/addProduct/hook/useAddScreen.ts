import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";
import { AddScreenInterface } from "@/addProduct/interfaces/addScreenInterface";

import { addScreen } from "@/addProduct/service/addScreenService";

export function useAddScreen() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      screenData,
    }: {
      productId: string;
      screenData: AddScreenInterface;
    }) => addScreen(productId, screenData),
    onSuccess: () => {
      toast.success("Información agregada", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["screenInformation"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      toast.error(error.message, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });
}
