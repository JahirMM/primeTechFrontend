import { useQuery } from "@tanstack/react-query";

import { OrdersResponseInterface } from "@/profile/interfaces/ordersResponseInterface";

import { getPurchasedProduct } from "@/profile/service/purchasedProductService";

export const usePurchasedProduct = () => {
  return useQuery<OrdersResponseInterface, Error>({
    queryKey: ["categories"],
    queryFn: getPurchasedProduct,
    staleTime: 1000 * 60 * 6,
    refetchOnWindowFocus: false,
  });
};