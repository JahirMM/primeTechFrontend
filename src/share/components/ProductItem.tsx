function ProductItem() {
  return (
    <article
      className="bg-white min-h-[252px] min-w-[216px] max-h-[252px] max-w-[216px] p-3 rounded-xl"
      aria-labelledby="product-title"
    >
      <div className="w-full h-[132px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/home/img-home.svg"
          alt="Imagen de producto - Nombre del producto"
          className="object-contain w-full h-full"
        />
      </div>

      <div>
        <div className="flex gap-3 text-xs mt-2">
          <span>marca</span>
          <span>4.9</span>
        </div>
        <h3
          id="product-title"
          className="inline-block mt-2 text-base font-bold truncate w-full"
        >
          Nombre del producto
        </h3>
        <div className="mt-2">
          <span>$120</span>.<span className="text-xs">000</span>
        </div>
      </div>
    </article>
  );
}

export default ProductItem;
