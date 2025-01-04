import SearchIcon from "@/icons/SearchIcon";
import ArrowIcon from "@/icons/ArrowIcon";

function FeaturedSection() {
  return (
    <div className="bg-primaryColor py-6 px-4 rounded-3xl">
      <div className="bg-secondaryColor flex items-center gap-2 p-2 rounded-xl">
        <SearchIcon className="size-4" />
        <input type="text" className="bg-secondaryColor flex-1 px-1" />
      </div>
      <div className="mt-5 grid grid-cols-6 gap-3 text-sm">
        <div className="cursor-pointer bg-transparent border border-black rounded-xl col-start-1 col-end-3 text-center py-8 px-3 flex justify-center items-center">
          <span className="text-white">Recientes</span>
        </div>
        <div className="cursor-pointer bg-white rounded-xl col-start-3 col-end-7 py-8 px-3 flex gap-3 justify-center items-center">
          <span>Productos populares</span>
          <span className="bg-secondaryColor p-3 rounded-full">
            <ArrowIcon className="size-4" />
          </span>
        </div>
        <div className="cursor-pointer bg-white text-center rounded-xl col-start-1 col-end-4 py-7 px-3 flex flex-col items-center justify-center gap-3">
          <span>Ofertas especiales</span>
          <span className="bg-secondaryColor p-3 rounded-full">
            <ArrowIcon className="size-4" />
          </span>
        </div>
        <div className="cursor-pointer bg-secondaryColor rounded-xl col-start-4 col-end-7 py-7 px-3 flex flex-col justify-center items-center gap-3">
          <span>Ver todo</span>
          <span className="bg-white p-3 rounded-full">
            <ArrowIcon className="size-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default FeaturedSection;
