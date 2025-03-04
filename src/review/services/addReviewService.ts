import { AddReviewResponseInterface } from "@/review/interfaces/addReviewResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const addReview = async (
  productId: string,
  data: { rating: number; comment: string }
): Promise<AddReviewResponseInterface> => {
  const response = await initialApi.post(`/review/${productId}`, data);

  return response.data;
};
