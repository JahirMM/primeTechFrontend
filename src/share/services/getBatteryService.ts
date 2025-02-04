import { GetBatteryResponseInterface } from "@/share/interfaces/getBatteryResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getBattery = async (
  productId: string
): Promise<GetBatteryResponseInterface> => {
  const response = await initialApi.get(`/battery/${productId}`);

  return response.data;
};
