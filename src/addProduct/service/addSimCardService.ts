import { AddSimCardResponseInterface } from "@/addProduct/interfaces/addSimCardRespondeInterface";
import { AddSimCardInterface } from "@/addProduct/interfaces/addSimCardInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const addSimCard = async (
  mobileDeviceId: string,
  simCardData: AddSimCardInterface
): Promise<AddSimCardResponseInterface> => {
  const response = await initialApi.post(`/sim-card/${mobileDeviceId}`, simCardData);

  return response.data;
};
