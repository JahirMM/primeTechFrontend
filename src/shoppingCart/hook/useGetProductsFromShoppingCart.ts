import { useQuery } from "@tanstack/react-query";

import { GetShoppingCartResponseInterface } from "@/shoppingCart/interfaces/getShoppingCartResponseInterface";

import { getProductsFromTheShoppingCart } from "@/shoppingCart/services/shoppingCartService";

export const useGetProductsFromShoppingCart = () => {
  return useQuery<GetShoppingCartResponseInterface, Error>({
    queryKey: ["productFromShoppingCart"],
    queryFn: () => getProductsFromTheShoppingCart(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
