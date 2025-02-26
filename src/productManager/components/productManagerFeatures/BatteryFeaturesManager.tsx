import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { GetBatteryResponseInterface } from "@/share/interfaces/getBatteryResponseInterface";
import { AddBatteryInterface } from "@/addProduct/interfaces/addBatteryInterface";
import { BatteryInterface } from "@/share/interfaces/batteryInterface";

import { validateNonNegativeNumber } from "@/share/utils/validateNonNegativeNumber";
import { removeNumericCharacters } from "@/share/utils/removeNumericCharacters";

import { useUpdateBattery } from "@/updateProduct/hook/useUpdateBattery";
import { useAddBattery } from "@/addProduct/hook/useAddBattery";
import { useGetBattery } from "@/share/hook/useGetBattery";

import FeatureTable from "@/share/components/FeatureTable";

interface BatteryField {
  label: string;
  key: string;
  type: "text" | "number" | "checkbox";
  validation?: (value: string) => string;
}

const batteryFields: BatteryField[] = [
  {
    label: "Capacidad (mAh)",
    key: "capacity",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
  },
  {
    label: "Tipo de batería",
    key: "type",
    type: "text",
    validation: (value) => removeNumericCharacters(value),
  },
  { label: "Carga inalámbrica", key: "wirelessCharging", type: "checkbox" },
  { label: "Carga rápida", key: "fastCharging", type: "checkbox" },
  {
    label: "Duración máxima (h)",
    key: "maxBatteryDuration",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
  },
];

function BatteryFeaturesManager({ productId }: { productId: string }) {
  const batteryResponse = productId ? useGetBattery(productId) : null;
  const mutationAddBattery = useAddBattery();
  const mutationUpdateBattery = useUpdateBattery();

  const batteryDataResponse = batteryResponse?.data ?? null;

  const [isDisabled, setIsDisabled] = useState(true);

  const [battery, setBattery] = useState(() =>
    batteryFields.reduce((acc, field) => {
      acc[field.key] = field.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, string | boolean>)
  );

  const parseBatteryData = (
    batteryData?: GetBatteryResponseInterface | null
  ) => {
    return batteryFields.reduce((acc, field) => {
      let value =
        batteryData?.battery[0]?.[field.key as keyof BatteryInterface];

      if (value !== undefined) {
        if (field.type === "checkbox") {
          acc[field.key] = Boolean(value);
        } else if (field.type === "number") {
          acc[field.key] = String(value).replace(/[^\d.]/g, "");
        } else {
          acc[field.key] = String(value);
        }
      } else {
        acc[field.key] = field.type === "checkbox" ? false : "";
      }

      return acc;
    }, {} as Record<string, string | boolean>);
  };

  useEffect(() => {
    if (productId && batteryDataResponse) {
      setBattery(parseBatteryData(batteryDataResponse));
    }
  }, [productId, batteryDataResponse]);

  const handleCancel = useCallback(() => {
    if (batteryResponse?.data) {
      setBattery(parseBatteryData(batteryResponse.data));
    }
    setIsDisabled(true);
  }, [batteryResponse, setBattery, setIsDisabled]);

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

    if (batteryDataResponse?.battery.length === 0) {
      try {
        await mutationAddBattery.mutateAsync({
          productId,
          batteryData: batteryRequest,
        });
        setIsDisabled(true);
      } catch (error) {
        return;
      }
    }

    if (batteryDataResponse && batteryDataResponse?.battery.length > 0) {
      try {
        await mutationUpdateBattery.mutateAsync({
          batteryId: batteryDataResponse.battery[0].batteryId,
          batteryData: batteryRequest,
        });
        setIsDisabled(true);
      } catch (error) {
        return;
      }
    }
  };

  return (
    <FeatureTable
      setDisabled={setIsDisabled}
      data={battery}
      setData={setBattery}
      isDisabled={isDisabled}
      fields={batteryFields}
      title="Batería"
      manageFeature={addBattery}
      handleCancel={handleCancel}
    />
  );
}

export default BatteryFeaturesManager;
