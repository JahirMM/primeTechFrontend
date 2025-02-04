import { useQuery } from "@tanstack/react-query";

import { GetMobileDeviceResponseInterface } from "@/share/interfaces/getMobileDeviceResponseInterface";

import { getMobileDevice } from "@/share/services/getMobileDeviceService";

export const useGetMobileDevice = (productId: string) => {
  return useQuery<GetMobileDeviceResponseInterface, Error>({
    queryKey: ["mobileDeviceInformation", productId],
    queryFn: () => getMobileDevice(productId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
