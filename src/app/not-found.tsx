import Header from "@/share/components/Header";
import Link from "next/link";

function NotFound() {
  return (
    <>
      <Header />
      <main className="h-[calc(100vh-58px)] mt-[58px] grid grid-cols-1 content-center sm:grid-cols-2">
        <section className="flex flex-col items-center justify-center px-5">
          <div>
            <div className="flex flex-col gap-3 text-5xl lg:text-7xl">
              <p className="text-gray-900">
                <span className="font-semibold text-primaryColor">
                  Lo sentimos!,{" "}
                </span>
                esta
              </p>
              <p className="text-gray-900">pagina no esta</p>
              <p className="text-gray-900">disponible</p>
            </div>
            <p className="mt-6 text-sm text-gray-900">
              No se ha podido encontrar la página que buscaba.
            </p>
            <p className="mt-20 text-sm text-gray-500">
              Vuelva a la{" "}
              <Link href={"/"} className="font-semibold text-primaryColor">
                página de inicio
              </Link>{" "}
              o visite{" "}
              <Link href={"/products"} className="font-semibold text-primaryColor">
                nuestros productos.
              </Link>
            </p>
          </div>
        </section>
        <section className="flex items-center justify-center px-5">
          <img
            src="/images/404/404Image.webp"
            alt=""
            className="h-96 w-96 lg:w-[500px] lg:h-[500px]"
          />
        </section>
      </main>
    </>
  );
}

export default NotFound;
