import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const checkUserProductReview = async (
  productId: string
): Promise<{ hasReview: boolean }> => {
  const response = await initialApi.get(`/has-review/${productId}`);
  return response.data;
};
