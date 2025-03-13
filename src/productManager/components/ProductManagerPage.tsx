import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProductManagerFeatures from "@/productManager/components/ProductManagerFeatures";
import ProductManagerForm from "@/productManager/components/ProductManagerForm";
import NotSellerMessage from "@/profile/components/NotSellerMessage";

import { useGetUserInformation } from "@/share/hook/useGetUserInformation";

import { GetProductDetailsResponseInterface } from "@/productDetails/interfaces/getProductDetailsResponseInterface";

interface ProductManagerPageProps {
  productIdFromUrl: string | undefined;
  productDetails: GetProductDetailsResponseInterface | undefined;
}

function ProductManagerPage({
  productIdFromUrl,
  productDetails,
}: ProductManagerPageProps) {
  const { data: userInformation } = useGetUserInformation();
  const router = useRouter();

  const [deviceType, setDeviceType] = useState<
    "mobile" | "laptop" | "other" | ""
  >("");
  const [productId, setProductId] = useState<string | undefined>(
    productIdFromUrl
  );

  useEffect(() => {
    if (productDetails) {
      setProductId(productDetails.product.productId);

      setDeviceType(
        ["mobile", "laptop", "other"].includes(
          productDetails.product.deviceType
        )
          ? (productDetails.product.deviceType as "mobile" | "laptop" | "other")
          : ""
      );
    }
  }, [productDetails]);

  if (userInformation) {
    if (!userInformation.user.roleNames.includes("seller")) {
      return (
        <NotSellerMessage
          title="Convierte tu Pasión en Ventas"
          message="Parece que aún no eres vendedor. ¡Publica tus productos y alcanza a miles de clientes potenciales!"
          buttonText="Convertirse en Vendedor"
        />
      );
    }
  }

  return (
    <>
      <div className="flex justify-end">
        <button
          type="button"
          className="px-3 py-2 mb-3 text-xs text-white rounded-md bg-primaryColor"
          onClick={() => router.push("/profile/my-products")}
          aria-label="Volver"
        >
          Volver
          <span className="sr-only">Volver</span>
        </button>
      </div>

      <ProductManagerForm
        deviceType={deviceType}
        productId={productId}
        setDeviceType={setDeviceType}
        setProductId={setProductId}
        productDetails={productDetails || null}
      />

      {deviceType && productId && (
        <ProductManagerFeatures deviceType={deviceType} productId={productId} />
      )}
    </>
  );
}

export default ProductManagerPage;
