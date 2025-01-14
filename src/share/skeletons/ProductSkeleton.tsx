function ProductSkeleton({ withMargin }: { withMargin: boolean }) {
  return (
    <article className={`bg-skeletonBackground min-h-[252px] min-w-[216px] max-h-[252px] max-w-[216px] p-3 rounded-xl ${withMargin ? "" : "mt-10"} mb-3`}>
      <div className="bg-skeletonColor w-full h-[132px] flex items-center justify-center overflow-hidden animate-pulse"></div>
      <div>
        <div className="flex gap-3 mt-2">
          <span className="block h-3 w-16 rounded-lg bg-skeletonColor animate-pulse"></span>
          <span className="block h-3 w-7 rounded-lg bg-skeletonColor animate-pulse"></span>
        </div>
        <div className="mt-5 h-5 w-full rounded-lg bg-skeletonColor animate-pulse"></div>
        <div className="mt-5">
          <span className="block h-3 w-16 rounded-lg bg-skeletonColor animate-pulse"></span>
        </div>
      </div>
    </article>
  );
}

export default ProductSkeleton;
