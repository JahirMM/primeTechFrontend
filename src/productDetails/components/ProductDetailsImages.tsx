import { useGetProductImages } from "@/share/hook/useGetProductImages";

import BoxIcon from "@/icons/BoxIcon";

function ProductDetailsImages({ productId }: { productId: string }) {
  const {
    data: productImagesData,
    isLoading: isProductImagesLoading,
    isError: hasProductImagesError,
  } = useGetProductImages(productId);

  if (isProductImagesLoading) return <div>Cargando imágenes...</div>;
  if (hasProductImagesError) return <div>Error en la carga de imágenes</div>;

  const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
  const productImages = productImagesData?.productImages || [];

  const mainImage = productImages.find((img) => img.main) || productImages[0];
  const secondaryImages = productImages.filter((img) => !img.main);

  return (
    <div className="px-5 pt-5 sm:flex sm:justify-center sm:gap-x-10 md:justify-center md:items-center md:col-start-1 md:col-end-3">
      <div className="flex justify-center p-3 mb-3 bg-secondaryColor sm:order-2">
        {mainImage ? (
          <img
            src={backendDomain + mainImage.imageUrl}
            alt="Imagen principal"
            className="w-64 h-64 bg-gray-100 md:w-full md:h-[464px]"
          />
        ) : (
          <BoxIcon className="text-gray-400 w-64 h-64 bg-gray-100 md:w-full md:h-[464px] p-10" />
        )}
      </div>

      {/* Imágenes secundarias */}
      {secondaryImages.length > 0 && (
        <div className="flex justify-between gap-2 sm:order-1 sm:flex-col">
          {secondaryImages.map(({ productImageId, imageUrl }) => (
            <img
              key={productImageId}
              src={backendDomain + imageUrl}
              alt="Imagen secundaria"
              className="border border-gray-500 size-14"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetailsImages;
