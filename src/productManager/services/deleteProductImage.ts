import { SuccessResponseInterface } from "@/share/interfaces/successResponseInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const deleteProductImage = async (
  imageId: string
): Promise<SuccessResponseInterface> => {
  const response = await initialApi.delete(`/product-image/${imageId}`);

  return response.data;
};
