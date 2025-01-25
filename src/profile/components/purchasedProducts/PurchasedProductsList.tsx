import PurchasedProduct from "./PurchasedProduct";

function PurchasedProductsList() {
  return (
    <div className="flex flex-col gap-y-20">
      <article className="p-4 border border-gray-300 rounded-xl">
        <span className="block pb-5 mb-5 text-sm border-b border-gray-300">
          29 de mayo de 2024
        </span>
        <div className="flex flex-col gap-y-8">
          <PurchasedProduct />
          <PurchasedProduct />
        </div>
      </article>
      <article className="p-4 border border-gray-300 rounded-xl">
        <span className="block pb-5 mb-5 text-sm border-b border-gray-300">
          29 de mayo de 2024
        </span>
        <div className="flex flex-col gap-y-8">
          <PurchasedProduct />
          <PurchasedProduct />
        </div>
      </article>
      <article className="p-4 border border-gray-300 rounded-xl">
        <span className="block pb-5 mb-5 text-sm border-b border-gray-300">
          29 de mayo de 2024
        </span>
        <div className="flex flex-col gap-y-8">
          <PurchasedProduct />
          <PurchasedProduct />
        </div>
      </article>
    </div>
  );
}

export default PurchasedProductsList;
