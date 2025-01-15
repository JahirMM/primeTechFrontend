import { Product } from "../interfaces/productInterface";

const useRecentProducts = () => {
  const addProductToRecent = (product: Product) => {
    let listRecentProducts = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );

    listRecentProducts = listRecentProducts.filter(
      (p: Product) => p.productId !== product.productId
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
