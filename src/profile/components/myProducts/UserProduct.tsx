import BoxIcon from "@/icons/BoxIcon";
import { UserProductInterface } from "@/profile/interfaces/userProductInterface";

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

function UserProduct({ product }: { product: UserProductInterface }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-x-3">
      {product.image ? (
        <img
          src={backendDomain + product.image}
          alt={`Imagen de producto - ${product.name}`}
          className="border border-gray-300 max-w-20 max-h-20 min-w-20 min-h-20"
        />
      ) : (
        <BoxIcon className="text-gray-400 border border-gray-300 max-w-20 max-h-20 min-w-20 min-h-20" />
      )}
      <div className="flex flex-col w-full">
        <span className="mb-3 text-lg font-bold">{product.name}</span>

        <table className="w-full border-collapse sm:max-w-80">
          <tbody>
            <tr className="py-1">
              <td className="pr-3 text-xs font-semibold text-gray-500">
                Marca:
              </td>
              <td className="text-xs text-gray-500">{product.brand}</td>
            </tr>
            <tr className="py-1">
              <td className="pr-3 text-xs font-semibold text-gray-500">
                Precio:
              </td>
              <td className="text-xs text-gray-500">${product.price}</td>
            </tr>
            <tr className="py-1">
              <td className="pr-3 text-xs font-semibold text-gray-500">
                Stock:
              </td>
              <td className="text-xs text-gray-500">{product.stock}</td>
            </tr>
            <tr className="py-1">
              <td className="pr-3 text-xs font-semibold text-gray-500">
                Tipo:
              </td>
              <td className="text-xs text-gray-500">{product.deviceType}</td>
            </tr>
          </tbody>
        </table>

        <div className="p-2 mt-4 bg-gray-100 rounded-md">
          <span className="block text-xs text-gray-600">
            <strong>Publicado:</strong> {product.createdAt}
          </span>
          {product.updatedAt && (
            <span className="block mt-1 text-xs text-gray-600">
              <strong>Última actualización:</strong> {product.updatedAt}
            </span>
          )}
        </div>

        <p className="mt-4 text-xs text-gray-500 line-clamp-6 text-pretty">
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default UserProduct;
