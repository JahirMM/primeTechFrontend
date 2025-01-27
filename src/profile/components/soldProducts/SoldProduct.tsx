function SoldProduct() {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-x-3">
      <img
        src="/images/home/img-home.svg"
        alt=""
        className="mb-6 border border-gray-300 max-w-28 max-h-28 min-w-28 min-h-28"
      />
      <div className="space-y-2">
        <span className="block text-lg font-bold">nombre del producto</span>
        <span className="block text-xs text-gray-500">precio</span>
        <span className="block text-xs text-gray-500">Cantiada: 5</span>
        <p className="text-xs text-gray-500 line-clamp-6 text-pretty">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse porro,
          nesciunt ab neque facere aspernatur eveniet minus repellendus
          inventore molestiae optio, dolores, mollitia illo! Ipsum incidunt
          dolores impedit aliquid voluptatum! isicing elit. Esse porro, nesciunt
          ab neque facere aspernatur eveniet minus repellendus inventore
          molestiae optio, dolores, mollitia illo! Ipsum incidunt dolores
          impedit aliquid voluptatum!
        </p>
      </div>
    </div>
  );
}

export default SoldProduct;
