import { UpdateSimCardResponseInterface } from "@/updateProduct/interfaces/updateSimCardResponseInterface";
import { UpdateSimCardInterface } from "@/updateProduct/interfaces/updateSimCardInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const updateSimCard = async (
  simCardId: string,
  simCardData: UpdateSimCardInterface
): Promise<UpdateSimCardResponseInterface> => {
  const response = await initialApi.put(`/sim-card/${simCardId}`, simCardData);

  return response.data;
};
