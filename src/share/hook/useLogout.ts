import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "@/share/hook/store/useAuth";
import { logout } from "@/share/services/logoutService";

import { useRouter } from "next/navigation";

export function uselogout() {
  const router = useRouter();
  const store = useAuthStore();

  const queryClient = useQueryClient();

  const mutationlogout = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      store.logout();
      router.push("/");

      queryClient.invalidateQueries({ queryKey: ["productFromShoppingCart"] });
      queryClient.invalidateQueries({ queryKey: ["userProductReview"] });
      queryClient.invalidateQueries({ queryKey: ["purchasedProduct"] });
      queryClient.invalidateQueries({ queryKey: ["favoriteProducts"] });
      queryClient.invalidateQueries({ queryKey: ["userInformation"] });
      queryClient.invalidateQueries({ queryKey: ["recentProducts"] });
      queryClient.invalidateQueries({ queryKey: ["userProducts"] });
      queryClient.invalidateQueries({ queryKey: ["soldProduct"] });
      queryClient.invalidateQueries({ queryKey: ["userImage"] });
    },
    onError: () => {
      store.logout();
      router.push("/");
    },
  });

  return mutationlogout;
}
