import Link from "next/link";

interface AuthMessageBoxProps {
  className?: string;
}

function AuthMessageBox({ className = "" }: AuthMessageBoxProps) {
  return (
    <section className={`${className}`}>
      <p className="text-lg font-semibold text-gray-800">
        ¡Inicia sesión para descubrir productos que te pueden interesar!
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Guarda tus productos favoritos y recibe recomendaciones personalizadas.
      </p>
      <Link href="/login" aria-label="Iniciar sesión">
        <button
          type="button"
          aria-label="Iniciar sesión"
          className="px-4 py-2 mt-4 text-sm font-bold text-white uppercase bg-primaryColor rounded-lg shadow-md hover:bg-primaryColor-dark transition"
        >
          Iniciar sesión
          <span className="sr-only">Iniciar sesión</span>
        </button>
      </Link>
    </section>
  );
}

export default AuthMessageBox;
