import { UpdateLaptopResponseInterface } from "@/updateProduct/interfaces/updateLaptopResponseInterface";
import { UpdateLaptopInterface } from "@/updateProduct/interfaces/updateLaptopInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const updateLaptop = async (
  laptopId: string,
  laptopData: UpdateLaptopInterface
): Promise<UpdateLaptopResponseInterface> => {
  const response = await initialApi.put(`/laptop/${laptopId}`, laptopData);

  return response.data;
};
