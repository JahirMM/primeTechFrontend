export interface SoldProductInterface {
  soldId: string;
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImg: string | null;
  purchaseQuantity: number;
  saleDate: string;
}
