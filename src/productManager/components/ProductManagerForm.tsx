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
  const [isDisabled, setIsDisabled] = useState(false);

  const [productData, setProductData] = useState<ProductRequestInterface>({
    name: productDetails ? productDetails.product.name : "",
    description: productDetails ? productDetails.product.description : "",
    brand: productDetails ? productDetails.product.brand : "",
    stock: productDetails ? productDetails.product.stock : 0,
    price: productDetails ? productDetails.product.price : 0,
    category: productDetails
      ? productDetails.product.category === "cellular"
        ? "celular"
        : productDetails.product.category === "tablet"
        ? "tablet"
        : productDetails.product.category === "other"
        ? "other"
        : ""
      : "",
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
      other: "other",
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
        setIsDisabled(true);
      } catch {
        toast.error("Ocurrió un error al agregar la información");
        return;
      }
    }

    if (productId) {
      try {
        mutationUpdateProduct.mutate({
          productId: productId,
          productData: productRequest,
        });
      } catch {
        toast.error("Ocurrió un error al actualizar la información");
        return;
      }
    }
  };

  return (
    <div>
      {productId && (
        <div className="mb-3">
          <button
            type="button"
            className="px-3 py-2 text-xs text-white rounded-md bg-primaryColor"
            onClick={() => handleSaveProduct()}
            aria-label="Guardar cambios"
          >
            Guardar cambios
            <span className="sr-only">Guardar cambios</span>
          </button>
        </div>
      )}
      <ProductImageManager
        productId={productId}
        images={images}
        setImages={setImages}
        isDisabled={isDisabled}
      />
      <ProductDetailsManager
        productData={productData}
        setProductData={setProductData}
        isDisabled={isDisabled}
      />
      <ProductPricingManager
        productData={productData}
        setProductData={setProductData}
        deviceType={deviceType}
        setDeviceType={setDeviceType}
        isDisabled={isDisabled}
      />
      {!productId && (
        <button
          onClick={handleSaveProduct}
          className="px-4 py-2 mt-4 text-sm text-white rounded-lg bg-primaryColor"
          aria-label="Crear producto"
        >
          Crear producto
          <span className="sr-only">Crear producto</span>
        </button>
      )}
    </div>
  );
}

export default ProductManagerForm;
