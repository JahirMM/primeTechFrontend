import { GetShoppingCartResponseInterface } from "@/share/interfaces/getShoppingCartResponseInterface";
import { AddToCartResponseInterface } from "@/share/interfaces/AddToCartResponseInterface";
import { ResponseMessageInterface } from "@/share/interfaces/ResponseMessageInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const addProductToShoppingCart = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}): Promise<AddToCartResponseInterface> => {
  const response = await initialApi.post(`/shopping-cart/${productId}`, {
    quantity,
  });
  return response.data;
};

export const getProductsFromTheShoppingCart =
  async (): Promise<GetShoppingCartResponseInterface> => {
    const response = await initialApi.get("/shopping-cart");
    return response.data;
  };

export const deleteProductsFromTheShoppingCart = async (
  productId: string
): Promise<ResponseMessageInterface> => {
  const response = await initialApi.delete(`/shopping-cart/${productId}`);
  return response.data;
};
