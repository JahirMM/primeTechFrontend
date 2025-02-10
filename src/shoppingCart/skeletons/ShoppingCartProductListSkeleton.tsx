function ShoppingCartProductListSkeleton() {
  return (
    <div className="space-y-4 lg:col-start-1 lg:col-end-3">
      <article className="flex flex-col gap-5 p-3 bg-white shadow-md lg:items-center rounded-xl sm:flex-row sm:gap-0">
        <div className="flex flex-1">
          <div className="w-20 h-20 rounded-md bg-skeletonBackground animate-pulse"></div>
          <div className="flex flex-col gap-2 ml-4">
            <div className="w-24 h-3 rounded-lg bg-skeletonBackground animate-pulse"></div>
            <div className="w-16 h-3 rounded-lg bg-skeletonBackground animate-pulse"></div>
            <div className="w-16 h-3 rounded-lg bg-skeletonBackground animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md bg-skeletonBackground animate-pulse"></div>

          <div className="w-2 h-10 bg-white"></div>

          <div className="w-10 h-10 rounded-md bg-skeletonBackground animate-pulse"></div>

          <div className="w-10 h-10 rounded-md bg-skeletonBackground animate-pulse"></div>
        </div>
      </article>
      <article className="flex flex-col gap-5 p-3 bg-white shadow-md lg:items-center rounded-xl sm:flex-row sm:gap-0">
        <div className="flex flex-1">
          <div className="w-20 h-20 rounded-md bg-skeletonBackground animate-pulse"></div>
          <div className="flex flex-col gap-2 ml-4">
            <div className="w-24 h-3 rounded-lg bg-skeletonBackground animate-pulse"></div>
            <div className="w-16 h-3 rounded-lg bg-skeletonBackground animate-pulse"></div>
            <div className="w-16 h-3 rounded-lg bg-skeletonBackground animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md bg-skeletonBackground animate-pulse"></div>

          <div className="w-2 h-10 bg-white"></div>

          <div className="w-10 h-10 rounded-md bg-skeletonBackground animate-pulse"></div>

          <div className="w-10 h-10 rounded-md bg-skeletonBackground animate-pulse"></div>
        </div>
      </article>
      <article className="flex flex-col gap-5 p-3 bg-white shadow-md lg:items-center rounded-xl sm:flex-row sm:gap-0">
        <div className="flex flex-1">
          <div className="w-20 h-20 rounded-md bg-skeletonBackground animate-pulse"></div>
          <div className="flex flex-col gap-2 ml-4">
            <div className="w-24 h-3 rounded-lg bg-skeletonBackground animate-pulse"></div>
            <div className="w-16 h-3 rounded-lg bg-skeletonBackground animate-pulse"></div>
            <div className="w-16 h-3 rounded-lg bg-skeletonBackground animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md bg-skeletonBackground animate-pulse"></div>

          <div className="w-2 h-10 bg-white"></div>

          <div className="w-10 h-10 rounded-md bg-skeletonBackground animate-pulse"></div>

          <div className="w-10 h-10 rounded-md bg-skeletonBackground animate-pulse"></div>
        </div>
      </article>
    </div>
  );
}

export default ShoppingCartProductListSkeleton;
