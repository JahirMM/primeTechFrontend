import Marquee from "../Marquee";
import ProductList from "../ProductList";

function PopularProductsSection() {
  return (
    <section className="bg-sectionColor py-10">
      <Marquee />
      <div className="mt-10 px-10">
        <header className="flex gap-3 items-center">
          <h2 className="text-lg font-bold whitespace-nowrap">
            Productos populares
          </h2>
          <span className="h-[1px] bg-gray-500 w-full block"></span>
        </header>
        <ProductList filter={{ minRating: 4 }} withBorder={false} />
      </div>
    </section>
  );
}

export default PopularProductsSection;
