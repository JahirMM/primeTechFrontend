import { useQuery } from "@tanstack/react-query";

import { GetScreenResponseInterface } from "@/share/interfaces/getScreenResponseInterface";

import { getScreen } from "@/share/services/getScreenService";

export const useGetScreen = (productId: string) => {
  return useQuery<GetScreenResponseInterface, Error>({
    queryKey: ["screenInformation", productId],
    queryFn: () => getScreen(productId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
