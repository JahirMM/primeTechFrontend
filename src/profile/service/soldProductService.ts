import { getInitialApi } from "@/share/hook/useInitialApi";
import { SoldProductsResponseInterface } from "../interfaces/soldProductsResponseInterface";

const initialApi = getInitialApi();

export const getSoldProduct =
  async (): Promise<SoldProductsResponseInterface> => {
    const response = await initialApi.get("/sales");

    return response.data;
  };
