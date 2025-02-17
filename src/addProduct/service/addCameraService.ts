import { AddCameraResponseInterface } from "@/addProduct/interfaces/addCameraResponseInterface";
import { AddCameraInterface } from "@/addProduct/interfaces/addCameraInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const addCamera = async (
  productId: string,
  cameraData: AddCameraInterface
): Promise<AddCameraResponseInterface> => {
  const response = await initialApi.post(`/camera/${productId}`, cameraData);

  return response.data;
};
