import { GetShoppingCartResponseInterface } from "@/share/interfaces/getShoppingCartResponseInterface";
import { AddToCartResponseInterface } from "@/share/interfaces/AddToCartResponseInterface";
import { ResponseMessageInterface } from "@/share/interfaces/ResponseMessageInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";
import { UpdateProductQuantityResponseInterface } from "../interfaces/updateProductFromShoppingCartInterface";

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

export const updateProductToShoppingCart = async ({
  productId,
  shoppingCartId,
  quantity,
}: {
  productId: string;
  shoppingCartId: string;
  quantity: number;
}): Promise<UpdateProductQuantityResponseInterface> => {
  const response = await initialApi.put(`/shopping-cart/${productId}`, {
    shoppingCartId: shoppingCartId,
    quantity: quantity,
  });
  return response.data;
};
