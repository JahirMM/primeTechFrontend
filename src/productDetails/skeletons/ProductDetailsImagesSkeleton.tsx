function ProductDetailsImagesSkeleton() {
  return (
    <div className="px-5 pt-5 sm:flex sm:justify-center animate-pulse sm:gap-x-10 md:justify-center md:items-center md:col-start-1 md:col-end-3">
      <div className="flex justify-center mb-3 sm:order-2 sm:w-full">
        <div className="w-64 h-64 bg-skeletonBackground md:w-full md:h-[464px]"></div>
      </div>

      <div className="flex justify-between gap-2 sm:order-1 sm:flex-col">
        <div className="border border-gray-300 bg-skeletonBackground size-14"></div>
        <div className="border border-gray-300 bg-skeletonBackground size-14"></div>
        <div className="border border-gray-300 bg-skeletonBackground size-14"></div>
        <div className="border border-gray-300 bg-skeletonBackground size-14"></div>
      </div>
    </div>
  );
}

export default ProductDetailsImagesSkeleton;
