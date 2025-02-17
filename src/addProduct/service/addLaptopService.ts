import { AddLaptopResponseInterface } from "@/addProduct/interfaces/addLaptopResponseInterface";
import { AddLaptopInterface } from "@/addProduct/interfaces/addLaptopInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const addLaptop = async (
  productId: string,
  laptopData: AddLaptopInterface
): Promise<AddLaptopResponseInterface> => {
  const response = await initialApi.post(`/laptop/${productId}`, laptopData);

  return response.data;
};
