import SearchIcon from "@/icons/SearchIcon";
import ArrowIcon from "@/icons/ArrowIcon";

function FeaturedSection() {
  return (
    <div
      className="
    bg-primaryColor py-6 px-4 mt-3 rounded-3xl 
      md:relative md:z-10
      md:w-[75%] md:m-auto 
      md:py-8
      lg:py-11 lg:px-10
      xl:w-[65%]"
    >
      <div className="bg-secondaryColor flex items-center gap-2 p-2 rounded-xl">
        <SearchIcon className="size-4" />
        <input type="text" className="bg-secondaryColor flex-1 px-1" />
      </div>
      <div className="mt-4 grid grid-cols-6 gap-3 text-md md:mt-10 md:grid-cols-11">
        <div
          className="
          cursor-pointer bg-transparent border border-black rounded-xl 
          col-start-1 col-end-3 
          text-center py-6 px-3 
          flex justify-center items-center
          md:max-h-[50%] md:py-10
          "
        >
          <span className="text-white">Recientes</span>
        </div>
        <div
          className="
          cursor-pointer bg-white rounded-xl
          col-start-3 col-end-7 py-6 px-3
          flex gap-3 justify-center items-center
          md:flex-col
          md:col-start-3 md:col-end-6 md:py-10
          lg:flex-row
          xl:py-16
          "
        >
          <span className="md:text-center">Productos populares</span>
          <span className="bg-secondaryColor p-3 rounded-full">
            <ArrowIcon className="size-4" />
          </span>
        </div>
        <div
          className="
          cursor-pointer bg-white text-center rounded-xl
          col-start-1 col-end-4 py-6 px-3
          flex flex-col items-center justify-center gap-3
          md:col-start-6 md:col-end-10 md:py-10
          md:flex-row
          xl:py-16
          "
        >
          <span>Ofertas especiales</span>
          <span className="bg-secondaryColor p-3 rounded-full">
            <ArrowIcon className="size-4" />
          </span>
        </div>
        <div
          className="
          cursor-pointer bg-secondaryColor rounded-xl
          col-start-4 col-end-7 py-6 px-3
          flex flex-col justify-center items-center gap-3
          md:col-start-10 md:col-end-12 md:py-10
          xl:py-16
          "
        >
          <span className="md:text-center">Ver todo</span>
          <span className="bg-white p-3 rounded-full">
            <ArrowIcon className="size-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default FeaturedSection;
