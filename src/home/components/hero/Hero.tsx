import FeaturedSection from "./FeaturedSection";
import Categories from "./Categories";

function Hero() {
  return (
    <section className="h-[calc(100vh-58px)] flex flex-col justify-center px-5 mt-[58px] xs:px-10 xs:gap-5 md:px-0">
      <div
        className="
        md:flex md:flex-row-reverse md:gap-5 
        md:w-[75%] md:m-auto
        md:mb-10 md:pt-0 md:items-start md:relative
        xl:w-[65%]
      "
      >
        <Categories />
        <div className="text-center md:flex-1">
          <h1 className="text-3xl font-bold mb-3 md:mb-10 md:text-5xl 2xl:text-6xl 2xl:mb-20">
            Vamos a Comprar <br className="hidden xs:block"></br> Tecnología
          </h1>
          <p className="text-md">
            Visita nuestros productos y encuentra tu dispositivo ideal
          </p>
        </div>
        <img
          src="/images/home/img-home.svg"
          alt="Imagen de la seccion home"
          className="
          hidden 
          lg:inline-block
          lg:absolute lg:left-0 lg:bottom-0 
          lg:z-0
          lg:-translate-x-[167px] lg:translate-y-[252px]
          lg:h-[400px] lg:w-[385px]
          2xl:size-[448px]
          2xl:-translate-x-[152px] 2xl:lg:translate-y-[264px]"
        />
      </div>
      <FeaturedSection />
    </section>
  );
}

export default Hero;
