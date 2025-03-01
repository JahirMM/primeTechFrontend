import { GetOfferResponseInterface } from "@/offer/interface/getOfferResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getOffer = async (
  productId: string
): Promise<GetOfferResponseInterface | null> => {
  try {
    const response = await initialApi.get(`/offers/${productId}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.error = () => {};
      return null;
    }
    throw error;
  }
};
