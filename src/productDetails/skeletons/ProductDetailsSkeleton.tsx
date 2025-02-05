function ProductDetailsSkeleton() {
  return (
    <>
      <div className="px-5 mt-5 md:mt-0">
        <div className="w-16 h-3 mb-4 rounded-lg bg-skeletonBackground animate-pulse"></div>
        <div className="w-24 h-3 mt-1 rounded-lg bg-skeletonBackground animate-pulse"></div>
        <div className="w-4/5 h-2 mt-4 rounded-lg bg-skeletonBackground animate-pulse"></div>
        <div className="w-16 h-3 mt-3 mb-3 rounded-lg bg-skeletonBackground animate-pulse sm:mt-6 sm:mb-0"></div>
      </div>
      <div className="flex px-5 gap-x-2 animate-pulse md:mt-0">
        <div className="rounded-full size-12 bg-skeletonBackground"></div>
        <div className="flex flex-col justify-center gap-y-3">
          <div className="w-16 h-3 rounded-lg bg-skeletonBackground"></div>
          <div className="w-10 h-2 rounded-lg bg-skeletonBackground"></div>
        </div>
      </div>
      <div className="flex items-center gap-5 px-5 mt-5 animate-pulse md:mt-0">
        <div className="w-20 h-10 bg-skeletonBackground rounded-xl"></div>
        <div className="w-20 h-10 bg-skeletonBackground rounded-xl"></div>
      </div>
      <div className="flex flex-col gap-2 px-5 mt-5 animate-pulse md:mt-0 md:row-start-2 md:row-end-3">
        <div className="w-5/6 h-2 rounded-lg bg-skeletonBackground"></div>
        <div className="w-8/12 h-2 rounded-lg bg-skeletonBackground"></div>
        <div className="w-3/4 h-2 rounded-lg bg-skeletonBackground"></div>
      </div>
    </>
  );
}

export default ProductDetailsSkeleton;
