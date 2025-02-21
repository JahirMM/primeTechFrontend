import { UpdateBatteryResponseInterface } from "@/updateProduct/interfaces/updateBatteryResponseInterface";
import { UpdateBatteryInterface } from "@/updateProduct/interfaces/updateBatteryInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const updateBattery = async (
  batteryId: string,
  batteryData: UpdateBatteryInterface
): Promise<UpdateBatteryResponseInterface> => {
  const response = await initialApi.put(`/battery/${batteryId}`, batteryData);

  return response.data;
};
