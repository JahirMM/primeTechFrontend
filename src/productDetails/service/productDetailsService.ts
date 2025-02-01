import { GetProductDetailsResponseInterface } from "@/productDetails/interfaces/ProductDetailsResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const getProductDetails = async (
  productId: string
): Promise<GetProductDetailsResponseInterface> => {
  const response = await initialApi.get(`/products/${productId}`);

  return response.data;
};
