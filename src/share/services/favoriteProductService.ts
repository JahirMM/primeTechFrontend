import {
  AddFavoriteProductResponseInterface,
  GetFavoriteProductsResponseInterface,
} from "@/share/interfaces/favoriteProductInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const addFavoriteProduct = async (
  productId: string
): Promise<AddFavoriteProductResponseInterface> => {
  const response = await initialApi.post(`/favorite-products/${productId}`);
  return response.data;
};

export const getFavoriteProducts =
  async (): Promise<GetFavoriteProductsResponseInterface> => {
    const response = await initialApi.get("/favorite-products");
    console.log("PRODUCTOS FAVORITOS");

    console.log(response);

    return response.data;
  };
