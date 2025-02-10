export interface UpdatedItemInterface {
  shoppingCartId: string;
  productId: string;
  quantity: number;
}

export interface UpdateProductQuantityResponseInterface {
  message: string;
  updatedItem: UpdatedItemInterface;
}
