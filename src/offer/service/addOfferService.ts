import { AddOfferResponseInterface } from "@/offer/interface/addOfferResponseInterface";
import { AddOfferInterface } from "@/offer/interface/addOfferInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const addOffer = async (
  productId: string,
  offerData: AddOfferInterface
): Promise<AddOfferResponseInterface> => {
  const response = await initialApi.post(`/offers/${productId}`, offerData);
  return response.data;
};
