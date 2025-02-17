import { AddMobileDeviceResponseInterface } from "@/addProduct/interfaces/addMobileDeviceResponseInterface";
import { AddMobileDeviceInterface } from "@/addProduct/interfaces/addMobileDeviceInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const addMobileDevice = async (
  productId: string,
  mobileDeviceData: AddMobileDeviceInterface
): Promise<AddMobileDeviceResponseInterface> => {
  const response = await initialApi.post(
    `/mobile-device/${productId}`,
    mobileDeviceData
  );

  return response.data;
};
