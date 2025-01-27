import SoldProduct from "./SoldProduct";

function SoldProductsList() {
  return (
    <div className="flex flex-col gap-y-20">
      <article className="p-4 border border-gray-300 rounded-xl">
        <div className="flex justify-between">
          <span className="block mb-6 text-sm">20 de enero 2025</span>
          <span className="block text-sm font-bold text-primaryColor">
            vendido
          </span>
        </div>
        <SoldProduct/>
      </article>
    </div>
  );
}

export default SoldProductsList;
