import { useQuery } from "@tanstack/react-query";

import { GetBatteryResponseInterface } from "@/share/interfaces/getBatteryResponseInterface";

import { getBattery } from "@/share/services/getBatteryService";

export const useGetBattery = (productId: string) => {
  return useQuery<GetBatteryResponseInterface, Error>({
    queryKey: ["batteryInformation", productId],
    queryFn: () => getBattery(productId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
