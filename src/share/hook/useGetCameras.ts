import { useQuery } from "@tanstack/react-query";

import { GetCameraResponseInterface } from "@/share/interfaces/getCameraResponseInterface";

import { getCameras } from "@/share/services/getCamerasService";

export const useGetCameras = (productId: string) => {
  return useQuery<GetCameraResponseInterface, Error>({
    queryKey: ["cameraInformation", productId],
    queryFn: () => getCameras(productId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
