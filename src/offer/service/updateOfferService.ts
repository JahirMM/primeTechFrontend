import { UpdateOfferResponseInterface } from "@/offer/interface/updateOfferResponseInterface";
import { UpdateOfferInterface } from "@/offer/interface/updateOfferInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const updateOffer = async (
  offerId: string,
  offerData: UpdateOfferInterface
): Promise<UpdateOfferResponseInterface> => {
  const response = await initialApi.put(`/offers/${offerId}`, offerData);
  return response.data;
};
