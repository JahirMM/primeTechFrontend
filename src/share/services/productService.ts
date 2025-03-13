import { getInitialApi } from "@/share/hook/useInitialApi";
import { ProductsResponse } from "@/share/interfaces/productInterface";

export const getProducts = async (
  filters: Record<string, string | number | boolean> = {}
): Promise<ProductsResponse> => {
  const initialApi = getInitialApi();

  const queryParams = new URLSearchParams(
    Object.entries(filters).reduce((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const response = await initialApi.get(
    `/products${queryParams ? `?${queryParams}` : ""}`
  );
  return response.data;
};
