import { GetReviewResponseInterface } from "@/review/interfaces/getReviewResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getReview = async (
  productId: string
): Promise<GetReviewResponseInterface> => {
  const response = await initialApi.get(`/review/${productId}`);

  return response.data;
};
