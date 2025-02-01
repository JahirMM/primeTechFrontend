import StarIcon from "@/icons/StarIcon";

function ProductDetails() {
  return (
    <section className="mt-[58px] min-h-[calc(100vh-58px)] md:grid md:grid-cols-4 md:justify-center">
      {/* IMAGENES */}
      <div className="px-5 pt-5 sm:flex sm:justify-center sm:gap-x-10 md:justify-center md:items-center md:col-start-1 md:col-end-3 ">
        <div className="flex justify-center p-3 mb-3 bg-secondaryColor sm:order-2">
          <img
            src="/images/home/img-home.svg"
            alt=""
            className="w-64 h-64 bg-gray-100 md:w-full md:h-[464px]"
          />
        </div>
        <div className="flex justify-between gap-2 sm:order-1 sm:flex-col">
          <img
            src="/images/home/img-home.svg"
            alt=""
            className="border border-gray-500 size-14"
          />
          <img
            src="/images/home/img-home.svg"
            alt=""
            className="border border-gray-500 size-14"
          />
          <img
            src="/images/home/img-home.svg"
            alt=""
            className="border border-gray-500 size-14"
          />
          <img
            src="/images/home/img-home.svg"
            alt=""
            className="border border-gray-500 size-14"
          />
        </div>
      </div>
      <div className="md:col-start-3 md:col-end-5 md:grid md:grid-cols-1 md:content-center md:gap-y-10 md:max-w-[85%]">
        {/* NOMBRE DEL PRODDUCTO */}
        <div className="px-5 mt-5 md:mt-0">
          <span className="block mb-4 text-xs text-gray-500">Laptop</span>
          <h1 className="mb-4 text-base font-bold">
            Laptop HP Omen 15 2020 color negro, 20gb y 32 ram
          </h1>
          <div className="flex gap-x-3">
            <StarIcon className="text-yellow-500 size-3" />
            <span className="text-xs">4.2</span>
          </div>
        </div>
        {/* VENDEDOR */}
        <div className="flex px-5 mt-5 gap-x-2 md:mt-0">
          <img
            src="/images/home/img-home.svg"
            alt=""
            className="border border-gray-500 rounded-full size-12"
          />
          <div className="flex flex-col gap-y-2">
            <span className="text-sm">Raul Hernandez</span>
            <span className="text-xs text-gray-500">49 productos vendidos</span>
          </div>
        </div>
        {/* BOTONES */}
        <div className="flex items-center justify-between gap-5 px-5 mt-5 sm:justify-start md:mt-0">
          <div className="px-3 py-2 bg-secondaryColor rounded-xl">
            <button className="px-1 mr-2">-</button>
            <span className="px-1">3</span>
            <button className="px-1 ml-2">+</button>
          </div>
          <button className="px-3 py-2 text-white bg-primaryColor rounded-xl">
            Agregar al carrito
          </button>
        </div>
        {/* DESCRIPYION */}
        <div className="px-5 mt-5 text-sm text-pretty md:mt-0 md:row-start-2 md:row-end-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde maxime
          doloremque id iste sed magnam animi quibusdam ducimus molestiae,
          deleniti optio atque aliquam iusto exercitationem. Explicabo, at!
          Asperiores, veritatis praesentium!
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
