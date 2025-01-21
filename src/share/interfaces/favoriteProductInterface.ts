export interface FavoriteProductInterface {
  productId: string;
  favoriteProductId: string;
  image: string;
  name: string;
  description: string;
  brand: string;
  stock: number;
  price: number;
  averageRating: number;
  activeOffer: boolean;
  discountPercentage: number;
}

export interface AddFavoriteProductResponseInterface {
  message: string;
  favoriteProduct: FavoriteProductInterface;
}

export interface GetFavoriteProductsResponseInterface {
  message: string;
  favoriteProducts: FavoriteProductInterface[];
}
