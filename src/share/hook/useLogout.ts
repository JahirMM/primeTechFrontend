import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/share/hook/store/useAuth";
import { logout } from "@/share/services/logoutService";

import { useRouter } from "next/navigation";

export function uselogout() {
  const router = useRouter();
  const store = useAuthStore();

  const mutationlogout = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      store.logout();
      router.push("/");
    },
    onError: () => {
      store.logout();
      router.push("/");
    },
  });

  return mutationlogout;
}
