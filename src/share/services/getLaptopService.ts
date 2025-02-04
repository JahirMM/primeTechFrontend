import { GetLaptopResponseInterface } from "@/share/interfaces/getLaptopResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getLaptop = async (
  productId: string
): Promise<GetLaptopResponseInterface> => {
  const response = await initialApi.get(`/laptop/${productId}`);

  return response.data;
};
