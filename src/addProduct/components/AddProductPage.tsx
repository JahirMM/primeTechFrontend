"use client";

import { useState } from "react";

import AddProductFeatures from "@/addProduct/components/AddProductFeatures";
import ProductForm from "@/addProduct/components/ProductForm";

interface ProductData {
  name: string;
  description: string;
  brand: string;
  stock: number;
  price: number;
  category: string;
}

function AddProductPage() {
  const [deviceType, setDeviceType] = useState<
    "mobile" | "laptop" | "other" | ""
  >("");
  const [productId, setProductId] = useState<string | null>(null);
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div>
      <ProductForm
        deviceType={deviceType}
        setDeviceType={setDeviceType}
        setProductId={setProductId}
      />
      {showFeatures && deviceType && (
        <AddProductFeatures deviceType={deviceType} />
      )}
    </div>
  );
}

export default AddProductPage;
