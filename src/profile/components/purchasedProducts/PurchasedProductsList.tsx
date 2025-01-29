"use client";

import ProfileProductListSkeleton from "@/profile/skeletons/ProfileProductListSkeleton";

import PurchasedProduct from "@/profile/components/purchasedProducts/PurchasedProduct";
import EmptyStateMessage from "@/profile/components/EmptyStateMessage";
import ErrorMessage from "@/profile/components/ErrorMessage";

import { usePurchasedProduct } from "@/profile/hook/useGetPurchasedProduct";

import { formatDate } from "@/share/utils/formatDate";

function PurchasedProductsList() {
  const { data, isLoading, isError } = usePurchasedProduct();

  if (isLoading) {
    return <ProfileProductListSkeleton />;
  }

  if (isError)
    return (
      <ErrorMessage
        title="Ocurrió un error al cargar los productos"
        message="Por favor, intenta nuevamente más tarde."
        buttonText="Reintentar"
        onClick={() => window.location.reload()}
      />
    );

  return (
    <div className="flex flex-col gap-y-20">
      {data && data.orders && data.orders.length > 0 ? (
        data.orders.map(({ orderId, orderDate, status, products }) => (
          <article
            className="p-4 border border-gray-300 rounded-xl"
            key={orderId}
          >
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-gray-300">
              <span className="block text-sm">{formatDate(orderDate)}</span>
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
        <EmptyStateMessage
          title="No has comprado ningún producto todavía"
          message="Parece que aún no has realizado ninguna compra. ¡Explora nuestros productos y encuentra lo que necesitas!"
          buttonText="Explorar Productos"
          buttonLink="/products"
        />
      )}
    </div>
  );
}

export default PurchasedProductsList;
