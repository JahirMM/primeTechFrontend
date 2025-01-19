import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { SignUpResponseInterface } from "@/auth/interfaces/signUpResponseInterface";

import { fetchSignUp } from "@/auth/services/signUpService";

export function useSignUp() {
  const mutationSignUp = useMutation({
    mutationFn: fetchSignUp,
    onSuccess: (response: SignUpResponseInterface) => {
      toast.success("Cuenta creada exitosamente", {
        duration: 5000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
    },
  });

  return mutationSignUp;
}
