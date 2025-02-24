import { SuccessResponseInterface } from "@/share/interfaces/successResponseInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const deleteCamera = async (
  cameraId: string
): Promise<SuccessResponseInterface> => {
  const response = await initialApi.delete(`/camera/${cameraId}`);

  return response.data;
};
