import { UserProductInterface } from "./userProductInterface";

export interface GetUserProductsResponse {
  message: string;
  product: UserProductInterface[];
}
