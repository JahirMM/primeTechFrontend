import { GetCameraResponseInterface } from "@/share/interfaces/getCameraResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getCameras = async (
  productId: string
): Promise<GetCameraResponseInterface> => {
  const response = await initialApi.get(`/camera/${productId}`);

  return response.data;
};
