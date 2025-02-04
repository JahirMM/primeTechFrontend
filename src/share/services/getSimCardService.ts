import { GetSimCardResponseInterface } from "@/share/interfaces/getSimCardResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getSimCard = async (
  productId: string
): Promise<GetSimCardResponseInterface> => {
  const response = await initialApi.get(`/sim-card/${productId}`);

  return response.data;
};
