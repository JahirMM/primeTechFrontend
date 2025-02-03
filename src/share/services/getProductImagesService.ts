import { ProductImagesResponseInterface } from "@/share/interfaces/productImagesResponseInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getProductImages = async (
  productId: string
): Promise<ProductImagesResponseInterface> => {
  const response = await initialApi.get(`/product-image/${productId}`);

  return response.data;
};
