import { AverageRatingResponse } from "@/share/interfaces/averageRatingResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getAverageRating = async (
  productId: string
): Promise<AverageRatingResponse> => {
  const response = await initialApi.get(`/review/average-rating/${productId}`);

  return response.data;
};