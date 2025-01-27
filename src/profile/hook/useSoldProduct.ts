import { useQuery } from "@tanstack/react-query";


import { SoldProductsResponseInterface } from "../interfaces/soldProductsResponseInterface";
import { getSoldProduct } from "../service/soldProductService";

export const useSoldProduct = () => {
  return useQuery<SoldProductsResponseInterface, Error>({
    queryKey: ["soldProduct"],
    queryFn: getSoldProduct,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};