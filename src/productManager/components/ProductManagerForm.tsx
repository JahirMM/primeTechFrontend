import { SetStateAction, useState } from "react";
import { toast } from "sonner";

import { GetProductDetailsResponseInterface } from "@/productDetails/interfaces/getProductDetailsResponseInterface";
import { ProductRequestInterface } from "@/addProduct/interfaces/productRequestInterface";
import { ImageObjectInterface } from "@/addProduct/interfaces/imageObjectInterface";

import ProductDetailsManager from "@/productManager/components/productManagerFeatures/ProductDetailsManager";
import ProductPricingManager from "@/productManager/components/productManagerFeatures/ProductPricingManager";
import ProductImageManager from "@/productManager/components/ProductImageManager";

import { useUploadProductImage } from "@/share/hook/useUploadProductImage";
import { useUpdateProduct } from "@/updateProduct/hook/useUpdateProduct";
import { useAddProduct } from "@/addProduct/hook/useAddProduct";

interface ProductManagerFormProps {
  deviceType: "mobile" | "laptop" | "other" | "";
  productId: string | undefined;
  setProductId: React.Dispatch<SetStateAction<string | undefined>>;
  setDeviceType: React.Dispatch<
    SetStateAction<"mobile" | "laptop" | "other" | "">
  >;
  productDetails: GetProductDetailsResponseInterface | null;
}

function ProductManagerForm({
  deviceType,
  productId,
  setDeviceType,
  setProductId,
  productDetails,
}: ProductManagerFormProps) {
  const mutationAddProduct = useAddProduct();
  const mutationUpdateProduct = useUpdateProduct();
  const mutationUploadProductImages = useUploadProductImage();

  const [images, setImages] = useState<ImageObjectInterface[]>([]);

  const [productData, setProductData] = useState<ProductRequestInterface>({
    name: productDetails ? productDetails.product.name : "",
    description: productDetails ? productDetails.product.description : "",
    brand: productDetails ? productDetails.product.brand : "",
    stock: productDetails ? productDetails.product.stock : 0,
    price: productDetails ? productDetails.product.price : 0,
    category: productDetails ? productDetails.product.category : "",
  });

  const handleSaveProduct = async () => {
    if (
      !productData.name ||
      !productData.description ||
      !productData.brand ||
      !productData.stock ||
      !productData.price ||
      !productData.category
    ) {
      toast.error("Ingresar toda la información obligatoria", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    const categoryMap: Record<string, string> = {
      celular: "cellular",
      otro: "other",
      tablet: "tablet",
      laptop: "laptop",
    };

    const categoryRequest = categoryMap[productData.category] || "";

    const productRequest = {
      name: productData.name,
      description: productData.description,
      brand: productData.brand,
      stock: productData.stock,
      price: productData.price,
      category: categoryRequest,
    };

    if (!productId) {
      try {
        const productResponse = (
          await mutationAddProduct.mutateAsync(productRequest)
        ).product;

        await Promise.all(
          images.map((image) =>
            mutationUploadProductImages.mutateAsync({
              productId: productResponse.productId,
              imageData: { file: image.img, isMain: image.isMain },
            })
          )
        );

        setProductId(productResponse.productId);
      } catch (error) {
        return;
      }
    }

    if (productId) {
      try {
        mutationUpdateProduct.mutate({
          productId: productId,
          productData: productRequest,
        });
      } catch (error) {
        return;
      }
    }
  };

  return (
    <div>
      {productId && (
        <div className="mb-3">
          <button
            className="px-3 py-2 text-xs text-white rounded-md bg-primaryColor"
            onClick={() => handleSaveProduct()}
          >
            Guardar cambios
          </button>
        </div>
      )}
      <ProductImageManager
        productId={productId}
        images={images}
        setImages={setImages}
      />
      <ProductDetailsManager
        productData={productData}
        setProductData={setProductData}
      />
      <ProductPricingManager
        productData={productData}
        setProductData={setProductData}
        deviceType={deviceType}
        setDeviceType={setDeviceType}
      />
      {!productId && (
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

export default ProductManagerForm;
