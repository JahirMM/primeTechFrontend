import ProductDetailsImagesSkeleton from "@/productDetails/skeletons/ProductDetailsImagesSkeleton";
import { useGetProductImages } from "@/share/hook/useGetProductImages";
import { ProductImageInterface } from "@/share/interfaces/productImageInterface";

import BoxIcon from "@/icons/BoxIcon";
import { useState } from "react";

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

function ProductDetailsImages({ productId }: { productId: string }) {
  const {
    data: productImagesData,
    isLoading: isProductImagesLoading,
    isError: hasProductImagesError,
  } = useGetProductImages(productId);


  const productImages = productImagesData?.productImages || [];

  const getInitialSelectedImage = (images: ProductImageInterface[]) => {
    const mainImage = images.find((img) => img.main);
    return mainImage
      ? { imageId: mainImage.productImageId, imageUrl: mainImage.imageUrl }
      : images.length > 0
      ? { imageId: images[0].productImageId, imageUrl: images[0].imageUrl }
      : null;
  };

  const [selectedImage, setSelectedImage] = useState(() =>
    getInitialSelectedImage(productImages)
  );

  if (
    productImages.length > 0 &&
    (!selectedImage || !productImages.some((img) => img.productImageId === selectedImage.imageId))
  ) {
    setSelectedImage(getInitialSelectedImage(productImages));
  }

  if (isProductImagesLoading) return <ProductDetailsImagesSkeleton />;
  if (hasProductImagesError) return <div>Error en la carga de imágenes</div>;

  return (
    <div className="px-5 pt-5 sm:flex sm:justify-center sm:gap-x-10 md:justify-center md:items-center md:col-start-1 md:col-end-3">
      <div className="flex items-center justify-center p-3 mb-3 bg-secondaryColor sm:order-2">
        {selectedImage ? (
          <img
            src={backendDomain + selectedImage.imageUrl}
            alt="Imagen principal"
            className="w-64 h-64 bg-gray-100 md:w-[800px] md:h-[464px]"
          />
        ) : (
          <BoxIcon className="text-gray-400 w-64 h-64 bg-gray-100 md:w-full md:h-[464px] p-10" />
        )}
      </div>
      <div className="flex justify-between gap-2 sm:order-1 sm:flex-col">
        {selectedImage &&
          productImages
            .filter((img) => img.productImageId !== selectedImage.imageId)
            .map(({ productImageId, imageUrl }) => (
              <img
                key={productImageId}
                src={backendDomain + imageUrl}
                alt="Imagen secundaria"
                className="border border-gray-500 cursor-pointer size-20"
                onClick={() => setSelectedImage({ imageId: productImageId, imageUrl })}
              />
            ))}
      </div>
    </div>
  );
}

export default ProductDetailsImages;
