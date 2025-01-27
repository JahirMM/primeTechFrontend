import { getInitialApi } from "@/share/hook/useInitialApi";
import { OrdersResponseInterface } from "../interfaces/ordersResponseInterface";

const initialApi = getInitialApi();

export const getPurchasedProduct = async (): Promise<OrdersResponseInterface> => {
  const response = await initialApi.get("/orders");

  return response.data;
};
