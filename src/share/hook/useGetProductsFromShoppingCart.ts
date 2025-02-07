import { useQuery } from "@tanstack/react-query";

import { GetShoppingCartResponseInterface } from "@/share/interfaces/getShoppingCartResponseInterface";

import { getProductsFromTheShoppingCart } from "@/share/services/shoppingCartService";

export const useGetProductsFromShoppingCart = () => {
  return useQuery<GetShoppingCartResponseInterface, Error>({
    queryKey: ["productFromShoppingCart"],
    queryFn: () => getProductsFromTheShoppingCart(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
