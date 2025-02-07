import { GetSellerInformationResponseInterface } from "@/productDetails/interfaces/getSellerInformationResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getSellerInformation = async (
  sellerId: string
): Promise<GetSellerInformationResponseInterface> => {
  const response = await initialApi.get(`/seller-information/${sellerId}`);

  return response.data;
};
