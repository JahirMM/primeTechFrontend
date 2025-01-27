function CategoriesItemsSkeleton() {
  return (
    <div className="flex justify-center gap-3 pt-5 mb-6 md:m-0 md:p-0 md:flex-col md:relative">
      <span className="block w-20 h-8 rounded-lg bg-skeletonBackground animate-pulse"></span>
      <span className="block w-20 h-8 rounded-lg bg-skeletonBackground animate-pulse"></span>
      <span className="block w-20 h-8 rounded-lg bg-skeletonBackground animate-pulse"></span>
    </div>
  );
}

export default CategoriesItemsSkeleton;
