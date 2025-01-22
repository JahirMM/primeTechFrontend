interface ProductRequest {
  productId: string;
  name: string;
  brand: string;
  price: number;
  image?: string;
  averageRating: number;
}

const useRecentProducts = () => {
  const addProductToRecent = (product: ProductRequest) => {
    let listRecentProducts = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );

    listRecentProducts = listRecentProducts.filter(
      (p: ProductRequest) => p.productId !== product.productId
    );

    listRecentProducts.unshift(product);

    if (listRecentProducts.length > 20) {
      listRecentProducts.pop();
    }

    localStorage.setItem("recentProducts", JSON.stringify(listRecentProducts));
  };

  return { addProductToRecent };
};

export default useRecentProducts;
