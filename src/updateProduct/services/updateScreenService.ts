import { UpdateScreenResponseInterface } from "@/updateProduct/interfaces/updateScreenResponseInterface";
import { UpdateScreenInterface } from "@/updateProduct/interfaces/updateScreenInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const updateScreen = async (
  screenId: string,
  screenData: UpdateScreenInterface
): Promise<UpdateScreenResponseInterface> => {
  const response = await initialApi.put(`/screen/${screenId}`, screenData);

  return response.data;
};
