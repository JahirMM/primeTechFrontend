import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "@/share/hook/store/useAuth";
import { logout } from "@/share/services/logoutService";

import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();
  const store = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      store.logout();
      router.push("/");

      const keys = [
        "productFromShoppingCart",
        "userProductReview",
        "purchasedProduct",
        "favoriteProducts",
        "userInformation",
        "recentProducts",
        "userProducts",
        "soldProduct",
        "userImage",
      ];
      keys.forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
    },
    onError: () => {
      store.logout();
      router.push("/");
    },
  });
}
