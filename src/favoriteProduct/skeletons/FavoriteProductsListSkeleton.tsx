import ProductSkeleton from "@/share/skeletons/ProductSkeleton";

const createProductSkeletons = (count: number) => {
  const productSkeletons = [];

  for (let i = 0; i < count; i++) {
    productSkeletons.push(ProductSkeleton);
  }
  return productSkeletons;
};

function FavoriteProductsListSkeleton() {
  const productSkeletons = createProductSkeletons(28);
  return (
    <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {productSkeletons.map((Skeleton, index) => (
        <div key={index}>
          <Skeleton withMargin={true} />
        </div>
      ))}
    </div>
  );
}

export default FavoriteProductsListSkeleton;
