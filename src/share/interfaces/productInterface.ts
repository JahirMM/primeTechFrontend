export interface Product {
    productId: string;
    sellerId: string;
    image: string;
    name: string;
    description: string;
    brand: string;
    stock: number;
    price: number;
    categoryName: string;
    deviceType: string;
    averageRating: number;
    discountPercentage: number;
    activeOffer: boolean;
    createdAt: string;
    updatedAt: string | null;
}

export interface Pagination {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
}

export interface ProductsResponse {
    products: Product[];
    page: Pagination;
}
