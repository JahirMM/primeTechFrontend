import AddGeneralFeatures from "@/addProduct/components/addFeatures/AddGeneralFeatures";
import AddBattery from "@/addProduct/components/addFeatures/AddBattery";
import AddCamera from "@/addProduct/components/addFeatures/AddCamera";
import AddScreen from "@/addProduct/components/addFeatures/AddScreen";

function AddProductFeatures({
  deviceType,
  productId,
}: {
  deviceType: "mobile" | "laptop" | "other" | "";
  productId: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <AddScreen productId={productId} />
      <AddBattery productId={productId} />

      <AddGeneralFeatures deviceType={deviceType} productId={productId} />

      <AddCamera productId={productId} />
    </div>
  );
}

export default AddProductFeatures;
