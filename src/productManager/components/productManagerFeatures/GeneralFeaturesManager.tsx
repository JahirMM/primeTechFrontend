import { useState } from "react";

import MobileDeviceFeaturesManager from "@/productManager/components/productManagerFeatures/MobileDeviceFeaturesManager";
import SimCardFeaturesManager from "@/productManager/components/productManagerFeatures/SimCardFeaturesManager";
import LaptopFeaturesManager from "@/productManager/components/productManagerFeatures/LaptopFeaturesManager";

interface GeneralFeaturesManagerProps {
  deviceType: "mobile" | "laptop" | "other" | "";
  productId: string;
}

function GeneralFeaturesManager({
  deviceType,
  productId,
}: GeneralFeaturesManagerProps) {
  const [mobileDeviceId, setMobileDeviceId] = useState<string | null>(null);
  return (
    <>
      {deviceType === "laptop" ? (
        <LaptopFeaturesManager productId={productId} />
      ) : (
        <MobileDeviceFeaturesManager
          productId={productId}
          setMobileDeviceId={setMobileDeviceId}
        />
      )}

      {deviceType === "mobile" && mobileDeviceId && (
        <SimCardFeaturesManager mobileDeviceId={mobileDeviceId} />
      )}
    </>
  );
}

export default GeneralFeaturesManager;
