import { ProductRequestInterface } from "@/addProduct/interfaces/productRequestInterface";
import { AddProductResponseInterface } from "@/addProduct/interfaces/addProductResponse";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const addProduct = async (
  productData: ProductRequestInterface
): Promise<AddProductResponseInterface> => {
  const response = await initialApi.post("/products", productData);

  return response.data;
};
