import { FilterDataResponseInterface } from "@/products/interfaces/filterDataResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getFilterData = async (): Promise<FilterDataResponseInterface> => {
  const response = await initialApi.get("/filter-data");

  return response.data;
};
