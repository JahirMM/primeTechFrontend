"use client";

import HomeProductList from "@/home/components/HomeProductList";

import ArrowIcon from "@/icons/ArrowIcon";
import { useRouter } from "next/navigation";

function SalesSection() {
  const router = useRouter();
  return (
    <section className="p-10 mb-10 mt-10 bg-white flex flex-col gap-5 md:flex-row md:items-center">
      <header className="md:w-[50%]">
        <h2 className="text-lg font-bold">Ofertas</h2>
        <p className="mb-5 mt-5 text-sm text-pretty">
          Descuentos increibles en tecnología. No pierdas la oportunidad de
          llevarte lo mejor en tecnología a precios inigualables
        </p>
        <button
          className="bg-primaryColor flex items-center gap-5 px-3 py-1 rounded-xl"
          onClick={() => router.push("/products?onSale=true")}
        >
          <span className="text-sm text-white">Ver todos</span>
          <ArrowIcon className="size-4 text-white" />
        </button>
      </header>
      <div className="md:max-w-[50%] lg:max-w-[80%] overflow-auto">
        <HomeProductList filter={{ onSale: true }} withBorder={true} />
      </div>
    </section>
  );
}

export default SalesSection;
