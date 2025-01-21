import { useRouter } from "next/navigation";

import HeartXmarkIcon from "@/icons/HeartXmarkIcon";
import HeartPlusIcon from "@/icons/HeartPlusIcon";
import AddCartIcon from "@/icons/AddCartIcon";

import { useFavoriteProduct } from "@/share/hook/useAddFavoriteProduct";
import { useAuthStore } from "@/share/hook/store/useAuth";

function ProductActionButtons({
  isFavorite,
  productId,
}: {
  isFavorite: boolean;
  productId: string;
}) {
  const mutationFavoriteProduct = useFavoriteProduct();
  const { initializeAuth } = useAuthStore();
  const router = useRouter();

  const handleFavoriteProduct = (
    event: React.MouseEvent,
    addToFavorites: boolean
  ) => {
    event.stopPropagation();

    if (!initializeAuth) {
      router.push("/login");
      return;
    }

    if (addToFavorites) {
      mutationFavoriteProduct.mutate(productId);
    } else {
      console.log("borrar producto favorito");
      return;
    }
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("AGREGADO");
  };

  return (
    <div className="flex flex-col gap-3 absolute top-[10px] right-[5px] translate-x-[35px] transition-transform duration-500 ease-linear group-hover:translate-x-[0]">
      <span className="p-1 rounded-full cursor-pointer bg-secondaryColor">
        <AddCartIcon className="size-5" onClick={handleAddToCart} />
      </span>
      <span className="p-1 text-center rounded-full cursor-pointer bg-secondaryColor">
        {isFavorite ? (
          <HeartXmarkIcon
            className="size-5"
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
