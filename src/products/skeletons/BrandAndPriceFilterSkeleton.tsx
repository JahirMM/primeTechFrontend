function BrandAndPriceFilterSkeleton() {
  return (
    <>
      <div className="pb-5 mt-5 border-b border-b-gray-400">
        <div className="mb-3 text-xs">Marca</div>
        <div className="w-full h-8 mb-2 rounded-lg bg-skeletonBackground animate-pulse"></div>
      </div>
      <div className="w-full p-3 mt-5 bg-white rounded-xl">
        <div className="mb-2 text-xs">Precio</div>
        <div className="w-full h-16 mb-2 rounded-lg bg-skeletonBackground animate-pulse"></div>
      </div>
    </>
  );
}

export default BrandAndPriceFilterSkeleton;
