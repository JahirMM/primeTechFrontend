import { useQuery } from "@tanstack/react-query";

import { GetLaptopResponseInterface } from "@/share/interfaces/getLaptopResponseInterface";

import { getLaptop } from "@/share/services/getLaptopService";

export const useGetLaptop = (productId: string) => {
  return useQuery<GetLaptopResponseInterface, Error>({
    queryKey: ["laptopInformation", productId],
    queryFn: () => {
      if (!productId) return Promise.reject(new Error("No productId provided"));
      return getLaptop(productId);
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
