function UserProduct() {
  const fechaCreacion = "14 de enero del 2024";
  const ultimaActualizacion = "24 de enero del 2024";

  return (
    <div className="flex flex-col sm:flex-row sm:gap-x-3">
      <img
        src={"/images/home/img-home.svg"}
        alt={`Imagen de producto - ${"nombre"}`}
        className="mb-6 border border-gray-300 sm:mb-0 max-w-28 max-h-28 min-w-28 min-h-28"
      />

      <div className="flex flex-col w-full">
        <span className="mb-3 text-lg font-bold">Nombre del producto</span>

        <table className="w-full border-collapse sm:max-w-80">
          <tbody>
            <tr className="py-1">
              <td className="pr-3 text-xs font-semibold text-gray-500">
                Marca:
              </td>
              <td className="text-xs text-gray-500">Apple</td>
            </tr>
            <tr className="py-1">
              <td className="pr-3 text-xs font-semibold text-gray-500">
                Precio:
              </td>
              <td className="text-xs text-gray-500">$3,424</td>
            </tr>
            <tr className="py-1">
              <td className="pr-3 text-xs font-semibold text-gray-500">
                Stock:
              </td>
              <td className="text-xs text-gray-500">40 unidades</td>
            </tr>
            <tr className="py-1">
              <td className="pr-3 text-xs font-semibold text-gray-500">
                Tipo:
              </td>
              <td className="text-xs text-gray-500">Mobile</td>
            </tr>
          </tbody>
        </table>

        <div className="p-2 mt-4 bg-gray-100 rounded-md">
          <span className="block text-xs text-gray-600">
            <strong>Publicado:</strong> {fechaCreacion}
          </span>
          {ultimaActualizacion && (
            <span className="block mt-1 text-xs text-gray-600">
              <strong>Última actualización:</strong> {ultimaActualizacion}
            </span>
          )}
        </div>

        <p className="mt-4 text-xs text-gray-500 line-clamp-6 text-pretty">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          perspiciatis iste ipsa, nulla distinctio autem dolores dicta repellat
          voluptas, sunt neque! Ipsum maxime molestiae error nulla ratione?
          Asperiores, quis aperiam.
        </p>
      </div>
    </div>
  );
}

export default UserProduct;
