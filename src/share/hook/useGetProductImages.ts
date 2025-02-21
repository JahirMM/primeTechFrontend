import { useQuery } from "@tanstack/react-query";

import { ProductImagesResponseInterface } from "@/share/interfaces/productImagesResponseInterface";

import { getProductImages } from "@/share/services/getProductImagesService";

export const useGetProductImages = (productId?: string) => {
  return useQuery<ProductImagesResponseInterface, Error>({
    queryKey: ["productImages", productId],
    queryFn: () => {
      if (!productId) return Promise.reject(new Error("No productId provided"));
      return getProductImages(productId);
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
