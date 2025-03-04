import { SuccessResponseInterface } from "@/share/interfaces/successResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const deleteUserProduct = async (
  productId: String
): Promise<SuccessResponseInterface> => {
  const response = await initialApi.delete(`/products/${productId}`);

  return response.data;
};
