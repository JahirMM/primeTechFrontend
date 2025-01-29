import { getInitialApi } from "@/share/hook/useInitialApi";

import { GetUserProductsResponse } from "@/profile/interfaces/getUserProductsResponseInterface";

const initialApi = getInitialApi();

export const getUserProducts = async (): Promise<GetUserProductsResponse> => {
  const response = await initialApi.get("/user-products");

  return response.data;
};
