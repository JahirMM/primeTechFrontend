import AddMobileDevice from "@/addProduct/components/addFeatures/AddMobileDevice";
import AddBattery from "@/addProduct/components/addFeatures/AddBattery";
import AddSimCard from "@/addProduct/components/addFeatures/AddSimCard";
import AddCamera from "@/addProduct/components/addFeatures/AddCamera";
import AddScreen from "@/addProduct/components/addFeatures/AddScreen";
import AddLaptop from "@/addProduct/components/addFeatures/AddLaptop";
import AddGeneralFeatures from "./addFeatures/AddGeneralFeatures";

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
