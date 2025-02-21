import { UpdateMobileDeviceResponseInterface } from "@/updateProduct/interfaces/updateMobileDeviceResponseInterface";
import { UpdateMobileDeviceInterface } from "@/updateProduct/interfaces/updateMobileDeviceInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const updateMobileDevice = async (
  mobileDeviceId: string,
  mobileDeviceData: UpdateMobileDeviceInterface
): Promise<UpdateMobileDeviceResponseInterface> => {
  const response = await initialApi.put(
    `/mobile-device/${mobileDeviceId}`,
    mobileDeviceData
  );

  return response.data;
};
