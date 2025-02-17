import { useRef } from "react";

import { ImageObjectInterface } from "@/addProduct/interfaces/imageObjectInterface";

interface AddProductImagesProps {
  images: ImageObjectInterface[];
  setImages: (images: ImageObjectInterface[]) => void;
}

function AddProductImages({ images, setImages }: AddProductImagesProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mainImage = images.find((img) => img.isMain) || null;

  const handleMainImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const newMainImage: ImageObjectInterface = { img: file, isMain: true };
      const updatedImages = [
        newMainImage,
        ...images
          .filter((img) => !img.isMain)
          .map((img) => ({ ...img, isMain: false })),
      ];
      setImages(updatedImages);
    }
  };

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (images.length < 5) {
        setImages([...images, { img: file, isMain: false }]);
      }
    }
  };

  const swapMainImage = (index: number) => {
    const newMain = images[index];
    if (newMain) {
      const updatedImages = images.map((img, i) =>
        i === index ? { ...img, isMain: true } : { ...img, isMain: false }
      );
      setImages(updatedImages);
    }
  };

  return (
    <div>
      {/* Imagen principal */}
      <div
        className="flex justify-center m-auto mb-3 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {mainImage ? (
          <img
            src={URL.createObjectURL(mainImage.img)}
            alt="Imagen Principal"
            className="w-64 h-64 bg-gray-100 object-contain border border-gray-500 rounded-xl md:w-full md:h-[360px]"
          />
        ) : (
          <div className="w-64 h-64 bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-500 rounded-xl md:w-full md:h-[360px]">
            Click para subir imagen principal
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleMainImageChange}
        className="hidden"
      />

      {/* Imágenes adicionales */}
      <div className="flex justify-around mt-4 gap-x-2">
        {images
          .filter((img) => !img.isMain)
          .map((imgObj, index) => (
            <img
              key={index}
              src={URL.createObjectURL(imgObj.img)}
              alt={`Imagen ${index + 1}`}
              className="border border-gray-500 rounded-lg cursor-pointer size-14"
              onClick={() => swapMainImage(index + 1)}
            />
          ))}

        {images.length < 5 && (
          <label className="flex items-center justify-center text-gray-500 border border-gray-500 cursor-pointer size-14">
            +
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAddImage}
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default AddProductImages;
