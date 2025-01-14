import ProductSkeleton from "@/share/skeletons/ProductSkeleton";

const createProductSkeletons = (count: number) => {
  const productSkeletons = [];

  for (let i = 0; i < count; i++) {
    productSkeletons.push(ProductSkeleton);
  }
  return productSkeletons;
};

function ProductListSkeleton({ withMargin }: { withMargin: boolean }) {
  const productSkeletons = createProductSkeletons(10);
  return (
    <ul
      className="w-full overflow-auto flex gap-5 no-scrollbar"
      aria-label="skeleton of the product list"
    >
      {productSkeletons.map((Skeleton, index) => (
        <li key={index}>
          <Skeleton withMargin={withMargin} />
        </li>
      ))}
    </ul>
  );
}

export default ProductListSkeleton;
