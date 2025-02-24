import GeneralFeaturesManager from "@/productManager/components/productManagerFeatures/GeneralFeaturesManager";
import BatteryFeaturesManager from "@/productManager/components/productManagerFeatures/BatteryFeaturesManager";
import ScreenFeaturesManager from "@/productManager/components/productManagerFeatures/ScreenFeaturesManager";
import CameraFeaturesManager from "@/productManager/components/productManagerFeatures/CameraFeaturesManager";

function ProductManagerFeatures({
  deviceType,
  productId,
}: {
  deviceType: "mobile" | "laptop" | "other" | "";
  productId: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
      <ScreenFeaturesManager productId={productId} />
      <BatteryFeaturesManager productId={productId} />

      <GeneralFeaturesManager deviceType={deviceType} productId={productId} />

      <CameraFeaturesManager productId={productId} deviceType={deviceType}/>
    </div>
  );
}

export default ProductManagerFeatures;
