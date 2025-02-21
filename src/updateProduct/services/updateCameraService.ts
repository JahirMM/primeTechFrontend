import { UpdateCameraResponseInterface } from "@/updateProduct/interfaces/updateCameraResponseInterface";
import { UpdateCameraInterface } from "@/updateProduct/interfaces/updateCameraInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const updateCamera = async (
  cameraId: string,
  cameraData: UpdateCameraInterface
): Promise<UpdateCameraResponseInterface> => {
  const response = await initialApi.put(`/camera/${cameraId}`, cameraData);

  return response.data;
};
