import AddMobileDevice from "./addFeatures/AddMobileDevice";
import AddSimCard from "./addFeatures/AddSimCard";
import AddBattery from "./addFeatures/AddBattery";
import AddCamera from "./addFeatures/AddCamera";
import AddScreen from "./addFeatures/AddScreen";
import AddLaptop from "./addFeatures/AddLaptop";

function AddProductFeatures({ deviceType }: { deviceType: string }) {
  return (
    <div className="grid grid-cols-1 gap-3 bg-green-300 sm:grid-cols-2">
      <AddScreen />
      <AddBattery />

      <div>
        <h2 className="mt-6 text-lg font-semibold">
          Características Generales
        </h2>
        {deviceType === "laptop" ? <AddLaptop /> : <AddMobileDevice />}
      </div>

      {deviceType === "mobile" && <AddSimCard />}

      <AddCamera />
    </div>
  );
}

export default AddProductFeatures;
