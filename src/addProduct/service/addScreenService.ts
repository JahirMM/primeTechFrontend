import { AddScreenResponseInterface } from "@/addProduct/interfaces/addScreenResponse";
import { AddScreenInterface } from "@/addProduct/interfaces/addScreenInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const addScreen = async (
  productId: string,
  screenData: AddScreenInterface
): Promise<AddScreenResponseInterface> => {
  const response = await initialApi.post(`/screen/${productId}`, screenData);

  return response.data;
};
