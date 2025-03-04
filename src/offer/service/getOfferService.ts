import { GetOfferResponseInterface } from "@/offer/interface/getOfferResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getProductOfferStatus = async (
  productId: string
): Promise<{ hasProductOffer: boolean }> => {
  const response = await initialApi.get(`/offers/${productId}/offer-status`);
  return response.data;
};

export const getOffer = async (
  productId: string
): Promise<GetOfferResponseInterface | null> => {
  const { hasProductOffer } = await getProductOfferStatus(productId);
  if (hasProductOffer) {
    const response = await initialApi.get(`/offers/${productId}`);
    return response.data;
  }
  return null;
};
