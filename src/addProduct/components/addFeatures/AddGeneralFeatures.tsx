import { useState } from "react";

import AddMobileDevice from "@/addProduct/components/addFeatures/AddMobileDevice";
import AddSimCard from "@/addProduct/components/addFeatures/AddSimCard";
import AddLaptop from "@/addProduct/components/addFeatures/AddLaptop";

interface AddGeneralFeaturesProps {
  deviceType: "mobile" | "laptop" | "other" | "";
  productId: string;
}

function AddGeneralFeatures({
  deviceType,
  productId,
}: AddGeneralFeaturesProps) {
  const [mobileDeviceId, setMobileDeviceId] = useState<string | null>(null);
  return (
    <>
      {deviceType === "laptop" ? (
        <AddLaptop productId={productId} />
      ) : (
        <AddMobileDevice
          productId={productId}
          setMobileDeviceId={setMobileDeviceId}
        />
      )}

      {deviceType === "mobile" && mobileDeviceId && (
        <AddSimCard mobileDeviceId={mobileDeviceId} />
      )}
    </>
  );
}

export default AddGeneralFeatures;
