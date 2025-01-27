"use client";

import PurchasedProduct from "@/profile/components/purchasedProducts/PurchasedProduct";
import { usePurchasedProduct } from "@/profile/hook/useGetPurchasedProduct";

import { formatDate } from "@/share/utils/formatDate";

function PurchasedProductsList() {
  const { data, isLoading, isError } = usePurchasedProduct();

  if (isLoading) {
    return <div>Cargando ...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col gap-y-20">
      {data && data.orders.length > 0 ? (
        data.orders.map(({ orderId, orderDate, status, products }) => (
          <article
            className="p-4 border border-gray-300 rounded-xl"
            key={orderId}
          >
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-gray-300">
              <span className="block text-sm">
                {formatDate(orderDate)}
              </span>
              <span className="block text-xs">{status}</span>
            </div>
            <div className="flex flex-col gap-y-8">
              {products.map((product) => (
                <PurchasedProduct product={product} key={product.productId} />
              ))}
            </div>
          </article>
        ))
      ) : (
        <div>no tiene productos comrpados</div>
      )}
    </div>
  );
}

export default PurchasedProductsList;
