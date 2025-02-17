import { AddBatteryResponseInterface } from "@/addProduct/interfaces/addBatteryResponseInterface";
import { AddBatteryInterface } from "@/addProduct/interfaces/addBatteryInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const addBattery = async (
  productId: string,
  batteryData: AddBatteryInterface
): Promise<AddBatteryResponseInterface> => {
  const response = await initialApi.post(`/battery/${productId}`, batteryData);

  return response.data;
};
