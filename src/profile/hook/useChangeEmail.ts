import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";
import { changeEmail } from "@/profile/service/changeEmailService";

export function useChangeEmail() {
  const queryClient = useQueryClient();

  const mutationChangeEmail = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      changeEmail(data),
    onSuccess: () => {
      toast.success("Correo actualizado", {
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

  return mutationChangeEmail;
}
