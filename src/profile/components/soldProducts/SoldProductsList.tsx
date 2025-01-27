"use client";

import { useSoldProduct } from "@/profile/hook/useSoldProduct";
import SoldProduct from "./SoldProduct";
import { formatDate } from "@/share/utils/formatDate";

function SoldProductsList() {
  const { data, isLoading, isError } = useSoldProduct();

  if (isLoading) {
    return <div>cargando...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col gap-y-20">
      {data && data.soldProduct && data.soldProduct.length > 0 ? (
        data.soldProduct.map((soldProduct) => (
          <article className="p-4 border border-gray-300 rounded-xl" key={soldProduct.soldId}>
            <div className="flex justify-between">
              <span className="block mb-6 text-sm">{formatDate(soldProduct.saleDate)}</span>
              <span className="block text-sm font-bold text-primaryColor">
                vendido
              </span>
            </div>
            <SoldProduct soldProduct={soldProduct}/>
          </article>
        ))
      ) : (
        <div>No tiene productos vendidos</div>
      )}
    </div>
  );
}

export default SoldProductsList;
