import { SuccessResponseInterface } from "@/share/interfaces/successResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const activateOffer = async (
  offerId: string
): Promise<SuccessResponseInterface> => {
  const response = await initialApi.patch(`/offers/${offerId}/activate`);
  return response.data;
};
