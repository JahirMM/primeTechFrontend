import { useState } from "react";
import { toast } from "sonner";

import { AddBatteryInterface } from "@/addProduct/interfaces/addBatteryInterface";

import { validateNonNegativeNumber } from "@/share/utils/validateNonNegativeNumber";
import { removeNumericCharacters } from "@/share/utils/removeNumericCharacters";

import { useAddBattery } from "@/addProduct/hook/useAddBattery";

import FeatureTable from "@/share/components/FeatureTable";

interface BatteryField {
  label: string;
  key: string;
  type: "text" | "number" | "checkbox";
  validation?: (value: string) => string;
}

const batteryFields: BatteryField[] = [
  { label: "Capacidad (mAh)", key: "capacity", type: "number", validation: (value) => validateNonNegativeNumber(value) },
  { label: "Tipo de batería", key: "type", type: "text", validation: (value) => removeNumericCharacters(value) },
  { label: "Carga inalámbrica", key: "wirelessCharging", type: "checkbox" },
  { label: "Carga rápida", key: "fastCharging", type: "checkbox" },
  { label: "Duración máxima (h)", key: "maxBatteryDuration", type: "number", validation: (value) => validateNonNegativeNumber(value) },
];

function BatteryFeaturesManager({ productId }: { productId: string }) {
  const mutationAddBattery = useAddBattery();

  const [isDisabled, setIsDisabled] = useState(false);

  const [battery, setBattery] = useState(() =>
    batteryFields.reduce((acc, field) => {
      acc[field.key] = field.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, string | boolean>)
  );

  const addBattery = async () => {
    if (!battery.capacity || !battery.type || !battery.maxBatteryDuration) {
      toast.error("Ingresar toda la información obligatoria", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    const batteryRequest: AddBatteryInterface = {
      capacity: battery.capacity.toString() + "mAh",
      type: battery.type.toString(),
      wirelessCharging: battery.wirelessCharging as boolean,
      fastCharging: battery.fastCharging as boolean,
      maxBatteryDuration: Number(battery.maxBatteryDuration),
    };

    try {
      await mutationAddBattery.mutateAsync({
        productId,
        batteryData: batteryRequest,
      });
      setIsDisabled(true);
    } catch (error) {
      return;
    }
  };

  return (
    <FeatureTable
      data={battery}
      setData={setBattery}
      isDisabled={isDisabled}
      fields={batteryFields}
      title="Batería"
      manageFeature={addBattery}
      buttonText="agregar"
    />
  );
}

export default BatteryFeaturesManager;
