function PurchasedProduct() {
  return (
    <div className="flex flex-col gap-y-4 md:justify-betweend md:flex-row md:gap-x-0">
      <div className="flex gap-x-4 md:flex-1">
        <img
          src="/images/home/img-home.svg"
          alt=""
          className="border border-gray-300 max-w-20 max-h-20 min-w-20 min-h-20"
        />
        <div>
          <span className="mb-3 text-sm">Entregado</span>
          <p className="text-sm font-bold">Nombre del producto</p>
          <span className="inline-block mb-5 text-xs text-gray-500">
            1 unidad
          </span>
          <p className="text-xs text-gray-500 line-clamp-3 text-pretty">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
            dolores consequuntur culpa architecto obcaecati repellendus,
            accusamus quod quidem porro ullam sequi aliquid, aut, alias
            voluptate? Quo expedita consequatur delectus pariatur?
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-6 md:mt-0 md:ml-8 md:flex-1 2xl:ml-28">
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-gray-800 uppercase">Vendedor</span>
          <span className="text-xs font-bold cursor-pointer text-primaryColor">
            Sus productos
          </span>
        </div>
        <div className="">
          <button className="px-3 py-2 text-sm text-white rounded-lg bg-primaryColor">
            Volver a comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchasedProduct;
