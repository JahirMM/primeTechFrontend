import { SetStateAction, useRef, useState } from "react";

import { ProductRequestInterface } from "@/addProduct/interfaces/productRequestInterface";
import { ImageObjectInterface } from "@/addProduct/interfaces/imageObjectInterface";

import AddProductPricing from "@/addProduct/components/AddProductPricing";
import AddProductDetails from "@/addProduct/components/AddProductDetails";
import AddProductImages from "@/addProduct/components/AddProductImages";

import { useUploadProductImage } from "@/share/hook/useUploadProductImage";
import { useAddProduct } from "@/addProduct/hook/useAddProduct";

interface ProductFormProps {
  deviceType: "mobile" | "laptop" | "other" | "";
  productId: string | null;
  setProductId: React.Dispatch<SetStateAction<string | null>>;
  setDeviceType: React.Dispatch<
    SetStateAction<"mobile" | "laptop" | "other" | "">
  >;
}

function ProductForm({
  deviceType,
  productId,
  setDeviceType,
  setProductId,
}: ProductFormProps) {
  const mutationAddProduct = useAddProduct();
  const mutationUploadProductImages = useUploadProductImage();

  const [images, setImages] = useState<ImageObjectInterface[]>([]);

  const productDataRef = useRef<ProductRequestInterface>({
    name: "",
    description: "",
    brand: "",
    stock: 0,
    price: 0,
    category: "",
  });

  const handleUpdateProductData = <K extends keyof ProductRequestInterface>(
    field: K,
    value: ProductRequestInterface[K]
  ) => {
    productDataRef.current[field] = value;
  };

  const handleSaveProduct = async () => {
    const categoryMap: Record<string, string> = {
      celular: "cellular",
      otro: "other",
      tablet: "tablet",
      laptop: "laptop",
    };

    const categoryRequest = categoryMap[productDataRef.current.category] || "";

    const productRequest = {
      name: productDataRef.current.name,
      description: productDataRef.current.description,
      brand: productDataRef.current.brand,
      stock: productDataRef.current.stock,
      price: productDataRef.current.price,
      category: categoryRequest,
    };

    try {
      const productResponse = (
        await mutationAddProduct.mutateAsync(productRequest)
      ).product;

      setProductId(productResponse.productId);

      await Promise.all(
        images.map((image) =>
          mutationUploadProductImages.mutateAsync({
            productId: productResponse.productId,
            imageData: { file: image.img, isMain: image.isMain },
          })
        )
      );
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      <AddProductImages images={images} setImages={setImages} />
      <AddProductDetails onUpdate={handleUpdateProductData} />
      <AddProductPricing
        onUpdate={handleUpdateProductData}
        deviceType={deviceType}
        setDeviceType={setDeviceType}
      />
      {productId === null && (
        <button
          onClick={handleSaveProduct}
          className="px-4 py-2 mt-4 text-sm text-white rounded-lg bg-primaryColor"
        >
          Crear producto
        </button>
      )}
    </div>
  );
}

export default ProductForm;
