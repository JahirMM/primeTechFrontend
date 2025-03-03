import { ProductPurchaseRequestInterface } from "@/shoppingCart/interfaces/productPurchaseRequestInterface";
import { PurchaseResponseInterface } from "@/shoppingCart/interfaces/purchaseResponseInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const addPurchasedProducts = async (
  productsPurchased: ProductPurchaseRequestInterface[]
): Promise<PurchaseResponseInterface> => {
  const response = await initialApi.post("/purchases", productsPurchased);
  return response.data;
};
