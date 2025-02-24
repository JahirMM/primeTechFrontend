// import { GetSimCardResponseInterface } from "@/share/interfaces/getSimCardResponseInterface";
// import { getInitialApi } from "@/share/hook/useInitialApi";

// const initialApi = getInitialApi();

// export const getSimCard = async (
//   productId: string
// ): Promise<GetSimCardResponseInterface> => {
//   const response = await initialApi.get(`/sim-card/${productId}`);

//   return response.data;
// };

import { GetSimCardResponseInterface } from "@/share/interfaces/getSimCardResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";
import { AxiosError } from "axios";

const initialApi = getInitialApi();

export const getSimCard = async (
  productId: string
): Promise<GetSimCardResponseInterface | null> => {
  try {
    const response = await initialApi.get(`/sim-card/${productId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      return null;
    }
    throw error;
  }
};
