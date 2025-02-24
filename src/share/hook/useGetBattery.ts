import { useQuery } from "@tanstack/react-query";

import { GetBatteryResponseInterface } from "@/share/interfaces/getBatteryResponseInterface";

import { getBattery } from "@/share/services/getBatteryService";

export const useGetBattery = (productId: string) => {
  return useQuery<GetBatteryResponseInterface, Error>({
    queryKey: ["batteryInformation", productId],
    queryFn: () => {
      if (!productId) return Promise.reject(new Error("No productId provided"));
      return getBattery(productId);
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
