import { GetMobileDeviceResponseInterface } from "@/share/interfaces/getMobileDeviceResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getMobileDevice = async (
  productId: string
): Promise<GetMobileDeviceResponseInterface> => {
  const response = await initialApi.get(`/mobile-device/${productId}`);

  return response.data;
};
