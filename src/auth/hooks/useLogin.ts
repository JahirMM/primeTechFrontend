import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { LoginResponseInterface } from "@/auth/interfaces/loginResponseInterface";
import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { fetchLogin } from "@/auth/services/loginService";

export function useLogin() {
  const router = useRouter();

  const mutationLogin = useMutation({
    mutationFn: fetchLogin,
    onSuccess: (response: LoginResponseInterface) => {
      toast.success(response.message, {
        duration: 5000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      toast.error(error.response?.data.message, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });

  return mutationLogin;
}
