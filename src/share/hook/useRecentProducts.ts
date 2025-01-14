import { Product } from "../interfaces/productInterface";

const useRecentProducts = () => {
  const addProductToRecent = (product: Product) => {
    let listRecentProducts = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );

    listRecentProducts = listRecentProducts.filter(
      (p: Product) => p.productId !== product.productId
    );

    listRecentProducts.push(product);

    if (listRecentProducts.length > 20) {
      listRecentProducts.shift();
    }

    localStorage.setItem("recentProducts", JSON.stringify(listRecentProducts));
  };

  return { addProductToRecent };
};

export default useRecentProducts;
