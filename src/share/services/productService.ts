import { getInitialApi } from "@/share/hook/useInitialApi";
import { ProductsResponse } from "@/share/interfaces/productInterface";

export const getProducts = async (
  filters: Record<string, any> = {}
): Promise<ProductsResponse> => {
  const initialApi = getInitialApi();

  const queryParams = new URLSearchParams(filters).toString();

  const response = await initialApi.get(
    `/products${queryParams ? `?${queryParams}` : ""}`
  );
  console.log("Fetched data:", response.data);
  return response.data;
};
