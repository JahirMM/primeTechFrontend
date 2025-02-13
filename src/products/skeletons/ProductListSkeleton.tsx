import ProductSkeleton from "@/share/skeletons/ProductSkeleton";

const createProductSkeletons = (count: number) => {
  const productSkeletons = [];

  for (let i = 0; i < count; i++) {
    productSkeletons.push(ProductSkeleton);
  }
  return productSkeletons;
};

function ProductListSkeleton() {
  const productSkeletons = createProductSkeletons(12);

  return (
    <section className="min-h-[calc(100vh-58px-52px)] mt-[56px] pb-3 pt-5 px-5 grid grid-cols-2 justify-items-center gap-x-5 gap-y-3 sm:grid-cols-3 md:px-16 lg:ml-60">
      {productSkeletons.map((Skeleton, index) => (
        <Skeleton withMargin={false} key={index} />
      ))}
    </section>
  );
}

export default ProductListSkeleton;
