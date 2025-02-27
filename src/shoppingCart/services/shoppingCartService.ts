import { GetShoppingCartResponseInterface } from "@/shoppingCart/interfaces/getShoppingCartResponseInterface";
import { ResponseMessageInterface } from "@/share/interfaces/ResponseMessageInterface";

import { UpdateProductQuantityResponseInterface } from "@/shoppingCart/interfaces/updateProductFromShoppingCartInterface";
import { AddToCartResponseInterface } from "@/shoppingCart/interfaces/addToCartResponseInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";
import axios from "axios";

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
  async (): Promise<GetShoppingCartResponseInterface | null> => {
    try {
      const response = await initialApi.get("/shopping-cart");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
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
