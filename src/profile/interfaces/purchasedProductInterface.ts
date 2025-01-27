export interface PurchasedProductInterface {
  purchaseId: string;
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImg: string | null;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  purchaseQuantity: number;
}
