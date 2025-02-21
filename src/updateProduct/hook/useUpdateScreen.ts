import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { UpdateScreenInterface } from "@/updateProduct/interfaces/updateScreenInterface";
import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { updateScreen } from "@/updateProduct/services/updateScreenService";

export function useUpdateScreen() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      screenId,
      screenData,
    }: {
      screenId: string;
      screenData: UpdateScreenInterface;
    }) => updateScreen(screenId, screenData),
    onSuccess: () => {
      toast.success("Información actualizada", {
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
