enum FilterType {
  BRAND = "brand",
  NAME = "name",
  CATEGORY_ID = "categoryId",
  SELLER_ID = "sellerId",
  MIN_PRICE = "minPrice",
  MAX_PRICE = "maxPrice",
  PAGE = "page",
  ON_SALE = "onSale",
  MIN_RATING = "minRating",
}
export interface FilterInterface {
  [FilterType.BRAND]?: string;
  [FilterType.NAME]?: string;
  [FilterType.CATEGORY_ID]?: string;
  [FilterType.SELLER_ID]?: string;
  [FilterType.MIN_PRICE]?: number;
  [FilterType.MAX_PRICE]?: number;
  [FilterType.PAGE]?: number;
  [FilterType.ON_SALE]?: boolean;
  [FilterType.MIN_RATING]?: number;
}
