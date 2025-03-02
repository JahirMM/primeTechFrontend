import { GetRecentProductsInterface } from "@/share/interfaces/getRecentProductsResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getRecentProducts =
  async (): Promise<GetRecentProductsInterface> => {
    const response = await initialApi.get("/recent-product");
    return response.data;
  };
