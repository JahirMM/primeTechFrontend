interface ProductRequest {
  productId: string;
  name: string;
  brand: string;
  price: number;
  image?: string;
  averageRating: number;
}

const useRecentProducts = () => {
  const addProductToRecent = async (product: ProductRequest): Promise<void> => {
    return new Promise((resolve) => {
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

      localStorage.setItem(
        "recentProducts",
        JSON.stringify(listRecentProducts)
      );

      resolve();
    });
  };

  return { addProductToRecent };
};

export default useRecentProducts;
