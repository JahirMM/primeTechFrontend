import { GetScreenResponseInterface } from "@/share/interfaces/getScreenResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getScreen = async (
  productId: string
): Promise<GetScreenResponseInterface> => {
  const response = await initialApi.get(`/screen/${productId}`);

  return response.data;
};
