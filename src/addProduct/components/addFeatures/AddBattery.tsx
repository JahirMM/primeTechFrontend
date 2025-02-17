import { useState } from "react";
import { toast } from "sonner";

import AddFeatureTable from "@/addProduct/components/addFeatures/AddFeatureTable";
import { useAddBattery } from "@/addProduct/hook/useAddBattery";

function AddBattery({ productId }: { productId: string }) {
  const mutationAddBattery = useAddBattery();

  const [isDisabled, setIsDisabled] = useState(false);
  const [battery, setBattery] = useState({
    Capacidad: "",
    "Tipo de batería": "",
    "Carga inalámbrica": false,
    "Carga rápida": false,
    "Duración máxima": "",
  });

  const addBattery = async () => {
    if (
      !battery.Capacidad ||
      !battery["Tipo de batería"] ||
      !battery["Duración máxima"]
    ) {
      toast.error("Ingresar toda la información", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    const batteryRequest = {
      capacity: battery.Capacidad + "mAh",
      type: battery["Tipo de batería"],
      wirelessCharging: battery["Carga inalámbrica"],
      fastCharging: battery["Carga rápida"],
      maxBatteryDuration: Number(battery["Duración máxima"]),
    };

    try {
      await mutationAddBattery.mutateAsync({
        productId: productId,
        batteryData: batteryRequest,
      });
      setIsDisabled(true);
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between my-6">
        <h2 className="text-lg font-semibold">Batería</h2>
        <button
          className="px-2 py-1 text-xs text-white rounded-lg bg-primaryColor"
          onClick={addBattery}
        >
          Agregar
        </button>
      </div>
      <AddFeatureTable
        data={battery}
        setData={setBattery}
        isDisabled={isDisabled}
      />
    </div>
  );
}

export default AddBattery;
