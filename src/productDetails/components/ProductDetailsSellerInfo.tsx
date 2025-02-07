import { useGetSellerInformation } from "@/productDetails/hook/useGetSellerInformation";
import UserIcon from "@/icons/UserIcon";

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

function ProductDetailsSellerInfo({ sellerId }: { sellerId: string }) {
  const { data, isLoading, isError } = useGetSellerInformation(sellerId);

  if (isLoading) {
    return (
      <div className="flex px-5 gap-x-2 animate-pulse md:mt-0">
        <div className="rounded-full size-12 bg-skeletonBackground"></div>
        <div className="flex flex-col justify-center gap-y-3">
          <div className="w-16 h-3 rounded-lg bg-skeletonBackground"></div>
          <div className="w-10 h-2 rounded-lg bg-skeletonBackground"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error en la carga del vendedor</div>;
  }

  return data ? (
    <div className="flex px-5 gap-x-2 md:mt-0 md:py-5">
      {data.imageUrl ? (
        <img
          src={backendDomain + data.imageUrl}
          alt=""
          className="border border-gray-500 rounded-full size-12"
        />
      ) : (
        <UserIcon className="border border-gray-500 rounded-full size-10" />
      )}
      <div className="flex flex-col gap-y-1">
        <span className="text-sm">
          {data.firstName} {data.paternalSurname}
        </span>
        <span className="text-xs text-gray-500">
          {data.quantityProducts} productos vendidos
        </span>
      </div>
    </div>
  ) : null;
}

export default ProductDetailsSellerInfo;
