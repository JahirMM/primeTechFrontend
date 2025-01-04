import FeaturedSection from "./FeaturedSection";
import Categories from "./Categories";

function Hero() {
  return (
    <section className="px-5">
      <Categories />
      <div className="text-center mb-7">
        <h1 className="text-4xl font-bold mb-3">Vamos a Comprar Tecnología</h1>
        <p className="text-sm">
          Visita nuestros productos y encuentra tu dispositivo ideal
        </p>
      </div>
      <FeaturedSection />
    </section>
  );
}

export default Hero;
