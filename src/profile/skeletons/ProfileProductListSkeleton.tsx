const createItemSkeleton = (count: number) => {
  const productSkeletons = [];

  for (let i = 0; i < count; i++) {
    productSkeletons.push(
      <article className="p-4 border border-gray-300 rounded-xl" key={`skeleton-${i}`}>
        <div className="flex flex-col">
          <div className="bg-skeletonBackground max-w-20 max-h-20 min-w-20 min-h-20"></div>
          <div className="w-4/5 h-4 mt-3 rounded-lg bg-skeletonBackground"></div>
          <div className="w-11/12 h-4 mt-3 rounded-lg bg-skeletonBackground"></div>
        </div>
      </article>
    );
  }
  return productSkeletons;
};

function ProfileProductListSkeleton() {
  const skeletons = createItemSkeleton(10);
  return (
    <div className="flex flex-col gap-y-10 animate-pulse">
      {skeletons.map(skeleton => skeleton)}
    </div>
  );
}

export default ProfileProductListSkeleton;
