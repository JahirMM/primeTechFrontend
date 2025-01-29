import ProductFilter from "./ProductFilter";
import ProductsList from "./ProductsList";

function ProductsPage() {
  return (
    <section className="mt-[58px] grid grid-cols-1 relative">
      <ProductFilter />
      <ProductsList />
    </section>
  );
}

export default ProductsPage;
