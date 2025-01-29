"use client";

import { useGetUserProducts } from "@/profile/hook/useGetUserProducts";
import UserProduct from "./UserProduct";

function UserProductsList() {
  const { data, isLoading, isError } = useGetUserProducts();

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="flex flex-col gap-y-20">
      {data && data.product && data.product.length > 0 ? (
        data.product.map((product) => (
          <article className="p-4 border border-gray-300 rounded-xl" key={product.productId}>
            <UserProduct product={product}/>
          </article>
        ))
      ) : (
        <div>No hay productos publicados</div>
      )}
    </div>
  );
}

export default UserProductsList;
