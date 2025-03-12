import { toast } from "sonner";

import HeartXmarkIcon from "@/icons/HeartXmarkIcon";
import HeartPlusIcon from "@/icons/HeartPlusIcon";
import AddCartIcon from "@/icons/AddCartIcon";

import { useAddProductToShoppingCart } from "@/share/hook/useAddProductToShoppingCart";
import { useDeleteFavoriteProduct } from "@/share/hook/useDeleteFavoriteProduct";
import { useFavoriteProduct } from "@/share/hook/useAddFavoriteProduct";
import { useAuthStore } from "@/share/hook/store/useAuth";

function ProductActionButtons({
  favoriteProductId,
  isFavorite,
  productId,
}: {
  favoriteProductId: string;
  isFavorite: boolean;
  productId: string;
}) {
  const mutationFavoriteProduct = useFavoriteProduct();
  const mutationDeleteFavoriteProduct = useDeleteFavoriteProduct();
  const mutationShoppingCart = useAddProductToShoppingCart();

  const { isAuthenticated } = useAuthStore();

  const handleFavoriteProduct = (
    event: React.MouseEvent,
    addToFavorites: boolean
  ) => {
    event.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Por favor iniciar sesión", {
        duration: 5000,
        style: { backgroundColor: "#ad8908", color: "white" },
      });
      return;
    }

    if (addToFavorites) {
      mutationFavoriteProduct.mutate(productId);
    } else {
      if (favoriteProductId) {
        mutationDeleteFavoriteProduct.mutate(favoriteProductId);
        return;
      }
    }
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Por favor iniciar sesión", {
        duration: 5000,
        style: { backgroundColor: "#ad8908", color: "white" },
      });
      return;
    }

    mutationShoppingCart.mutate({ productId: productId, quantity: 1 });
  };

  return (
    <div className="flex flex-col gap-3 absolute top-[10px] right-[5px] translate-x-[35px] transition-transform duration-500 ease-linear group-hover:translate-x-[0]">
      <span className="p-1 rounded-full cursor-pointer bg-secondaryColor">
        <AddCartIcon className="size-5" onClick={handleAddToCart} />
      </span>
      <span className="p-1 text-center rounded-full cursor-pointer bg-secondaryColor">
        {isFavorite ? (
          <HeartXmarkIcon
            className="text-red-500 size-5"
            onClick={(e) => handleFavoriteProduct(e, false)}
          />
        ) : (
          <HeartPlusIcon
            className="size-5"
            onClick={(e) => handleFavoriteProduct(e, true)}
          />
        )}
      </span>
    </div>
  );
}

export default ProductActionButtons;
