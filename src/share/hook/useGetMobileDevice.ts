import { useQuery } from "@tanstack/react-query";

import { GetMobileDeviceResponseInterface } from "@/share/interfaces/getMobileDeviceResponseInterface";

import { getMobileDevice } from "@/share/services/getMobileDeviceService";

export const useGetMobileDevice = (productId: string) => {
  return useQuery<GetMobileDeviceResponseInterface, Error>({
    queryKey: ["mobileDeviceInformation", productId],
    queryFn: () => {
      if (!productId) return Promise.reject(new Error("No productId provided"));
      return getMobileDevice(productId);
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
