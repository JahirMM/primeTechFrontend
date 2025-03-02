import { SuccessResponseInterface } from "@/share/interfaces/successResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const addRecentProducts = async (
  productId: string
): Promise<SuccessResponseInterface> => {
  const response = await initialApi.post(`/recent-product/${productId}`);
  return response.data;
};
