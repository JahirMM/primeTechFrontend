import { GetFavoriteProductsResponseInterface } from "@/share/interfaces/favoriteProductInterface";
import { getFavoriteProducts } from "@/share/services/favoriteProductService";
import { useQuery } from "@tanstack/react-query";

export const useFavoriteProducts = () => {
  return useQuery<GetFavoriteProductsResponseInterface, Error>({
    queryKey: ["favoriteProducts"],
    queryFn: getFavoriteProducts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
