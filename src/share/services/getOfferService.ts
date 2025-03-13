import { GetOfferResponseInterface } from "@/share/interfaces/getOfferResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getOffer = async (
  productId: string
): Promise<GetOfferResponseInterface | null> => {
  try {
    const response = await initialApi.get(`/offers/${productId}`);
    return response.data;
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "status" in error.response &&
      error.response.status === 404
    ) {
      return null;
    }
    throw error;
  }
};
