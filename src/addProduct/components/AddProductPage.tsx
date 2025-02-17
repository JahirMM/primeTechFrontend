"use client";

import { useState } from "react";

import AddProductFeatures from "@/addProduct/components/AddProductFeatures";
import ProductForm from "@/addProduct/components/ProductForm";
import ArrowIcon from "@/icons/ArrowIcon";

function AddProductPage() {
  const [deviceType, setDeviceType] = useState<
    "mobile" | "laptop" | "other" | ""
  >("");
  const [productId, setProductId] = useState<string | null>(null);
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <>
      <ProductForm
        deviceType={deviceType}
        productId={productId || null}
        setDeviceType={setDeviceType}
        setProductId={setProductId}
      />

      {deviceType && productId && showFeatures === false && (
        <div className="py-5">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primaryColor"
            onClick={() => setShowFeatures(true)}
          >
            <span className="text-sm text-white">Agregar característica</span>
            <ArrowIcon className="text-white size-3" />
          </button>
        </div>
      )}

      {showFeatures && deviceType && productId && (
        <AddProductFeatures deviceType={deviceType} productId={productId} />
      )}
    </>
  );
}

export default AddProductPage;
