import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { updateUserInformation } from "@/profile/service/updateUserInformationService";

export function useUpdateUserInformation() {
  const queryClient = useQueryClient();

  const mutationUserInformation = useMutation({
    mutationFn: updateUserInformation,
    onSuccess: () => {
      toast.success("Datos actualizados correctamente", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["userInformation"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      toast.error(error.response?.data.message, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });

  return mutationUserInformation;
}
