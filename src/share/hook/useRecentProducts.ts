const useRecentProducts = () => {
  const addProductToRecent = (product: {
    productId: string;
    name: string;
    brand: string;
    price: number;
    image?: string;
    averageRating: number;
  }) => {
    const listRecentProducts = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
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
