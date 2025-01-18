import { getInitialApi } from "@/share/hook/useInitialApi";
import { CategoryInterface } from "@/share/interfaces/categoryInterface";

export const getCategories = async (): Promise<CategoryInterface[]> => {
  const initialApi = getInitialApi();
  const response = await initialApi.get("/categories");

  return response.data;
};
