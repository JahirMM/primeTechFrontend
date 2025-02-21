import { UpdateProductResponseInterface } from "@/updateProduct/interfaces/updateProductResponseInterface";
import { UpdateProductInterface } from "@/updateProduct/interfaces/updateProductInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const updateProduct = async (
  productId: string,
  productData: UpdateProductInterface
): Promise<UpdateProductResponseInterface> => {
  const response = await initialApi.put(`/products/${productId}`, productData);

  return response.data;
};
