import ProductItem from "@/share/components/ProductItem";

import Marquee from "../Marquee";

function RecentSection() {
  return (
    <section className="bg-sectionColor py-10 mt-20">
      <Marquee />
      <div className="mt-10 px-10">
        <header className="flex gap-3 items-center">
          <h2 className="text-lg font-bold">Recientes</h2>
          <span className="h-[1px] bg-gray-500 w-full block"></span>
        </header>
        <ul
          className="mt-10 w-full overflow-auto flex gap-5"
          aria-label="Lista de productos recientes"
        >
          <li>
            {/* <ProductItem /> */}
          </li>
        </ul>
      </div>
    </section>
  );
}

export default RecentSection;
