"use client";

import { useEffect, useState, useRef } from "react";
import { useUploadProductImage } from "@/share/hook/useUploadProductImage";
import { ImageObjectInterface } from "@/addProduct/interfaces/imageObjectInterface";
import { ProductImageInterface } from "@/share/interfaces/productImageInterface";
import { useGetProductImages } from "@/share/hook/useGetProductImages";
import { useDeleteProductImage } from "../hook/useDeleteProductImage";
import { toast } from "sonner";

interface ProductImageManagerProps {
  productId?: string;
  images: ImageObjectInterface[];
  setImages: (images: ImageObjectInterface[]) => void;
  isDisabled: boolean;
}

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

function ProductImageManager({
  productId,
  images,
  setImages,
  isDisabled,
}: ProductImageManagerProps) {
  const mutationUpload = useUploadProductImage();
  const mutationDeleteProductImage = useDeleteProductImage();
  const productImagesResponse = useGetProductImages(productId);
  const productImages = productImagesResponse?.data ?? null;

  const [loadedImages, setLoadedImages] = useState<ProductImageInterface[]>([]);
  const mainImageInputRef = useRef<HTMLInputElement | null>(null);
  const additionalImageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (productId && productImages) {
      setLoadedImages(productImages.productImages);
    }
  }, [productId, productImages]);

  const handleAddImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    isMain: boolean
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (images.length + loadedImages.length >= 5) {
      toast.error("Solo puedes agregar hasta 5 imágenes", {
        duration: 5000,
        style: { backgroundColor: "#a49248", color: "white" },
      });
      return;
    }

    if (productId) {
      mutationUpload.mutate({
        productId: productId,
        imageData: { file, isMain },
      });
    } else {
      setImages([...images, { img: file, isMain }]);
    }
  };

  const handleDeleteMainImage = (
    imageId: string | null,
    imageFila: File | null
  ) => {
    if (productId && imageId) {
      mutationDeleteProductImage.mutate({ imageId: imageId });
      return;
    }
    setImages(images.filter((img) => img.img !== imageFila));
  };

  const handleSelectImage = (
    image: ProductImageInterface | ImageObjectInterface
  ) => {
    setImages(images.map((img) => ({ ...img, isMain: img === image })));
    setLoadedImages(
      loadedImages.map((img) => ({ ...img, main: img === image }))
    );
  };

  return (
    <div>
      {/* Imagen principal */}
      <div className="flex justify-center m-auto mb-10 cursor-pointer">
        {loadedImages.length > 0 &&
          loadedImages
            .filter((img) => img.main === true)
            .map((image) => (
              <div className="relative" key={image.productImageId}>
                <img
                  src={backendDomain + image.imageUrl}
                  alt="Imagen Principal"
                  className="object-contain w-64 h-64 bg-gray-100 border border-gray-500 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleDeleteMainImage(image.productImageId, null)
                  }
                  className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full"
                >
                  X
                </button>
              </div>
            ))}
        {images.length > 0 &&
          loadedImages.length === 0 &&
          images
            .filter((img) => img.isMain === true)
            .map((image, index) => (
              <div className="relative" key={index}>
                <img
                  src={URL.createObjectURL(image.img)}
                  alt="Imagen Principal"
                  className="object-contain w-64 h-64 bg-gray-100 border border-gray-500 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteMainImage(null, image.img)}
                  className="absolute text-sm text-white bg-red-500 rounded-full right-1 top-1 size-8"
                >
                  X
                </button>
              </div>
            ))}
        {!images.some((img) => img.isMain) &&
          !loadedImages.some((img) => img.main) && (
            <div
              className="flex items-center justify-center w-64 h-64 text-gray-500 bg-gray-100 border border-gray-500 rounded-xl"
              onClick={() => mainImageInputRef.current?.click()}
            >
              Click para subir imagen principal
            </div>
          )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={mainImageInputRef}
        className="hidden"
        onChange={(e) => handleAddImage(e, true)}
        disabled={isDisabled}
      />

      {/* Lista de imágenes adicionales */}
      <div className="flex flex-wrap justify-around gap-2">
        {loadedImages
          .filter((img) => !img.main)
          .map((image) => (
            <div key={image.productImageId} className="relative">
              <img
                src={`${backendDomain}${image.imageUrl}`}
                alt="Imagen Adicional"
                className="border border-gray-500 rounded-lg cursor-pointer size-14"
                onClick={() => handleSelectImage(image)}
              />
            </div>
          ))}

        {loadedImages.length === 0 &&
          images
            .filter((img) => !img.isMain)
            .map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image.img)}
                  alt="Imagen Adicional"
                  className="border border-gray-500 rounded-lg cursor-pointer size-14"
                  onClick={() => handleSelectImage(image)}
                />
              </div>
            ))}

        {(productId ? loadedImages.length : images.length) < 5 && (
          <>
            <button
              type="button"
              onClick={() => additionalImageInputRef.current?.click()}
              className="flex items-center justify-center bg-gray-300 border border-gray-500 rounded-lg size-14"
            >
              <span className="text-2xl font-bold">+</span>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={additionalImageInputRef}
              className="hidden"
              onChange={(e) => handleAddImage(e, false)}
              disabled={isDisabled}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ProductImageManager;
