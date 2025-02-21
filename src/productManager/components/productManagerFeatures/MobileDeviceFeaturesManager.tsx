import { useState } from "react";
import { toast } from "sonner";

import { AddMobileDeviceInterface } from "@/addProduct/interfaces/addMobileDeviceInterface";

import { validateNonNegativeNumber } from "@/share/utils/validateNonNegativeNumber";
import { removeNumericCharacters } from "@/share/utils/removeNumericCharacters";

import { useAddMobileDevice } from "@/addProduct/hook/useAddMobileDevice";

import FeatureTable from "@/share/components/FeatureTable";


interface MobileDeviceField {
  label: string;
  key: string;
  type: "text" | "number" | "checkbox";
  validation?: (value: string) => string;
}
const mobileDeviceFields: MobileDeviceField[] = [
  {
    label: "Memoria Interna (GB)",
    key: "internalMemory",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
  },
  {
    label: "Tipo de Memoria Interna",
    key: "internalMemoryType",
    type: "text",
    validation: (value) => removeNumericCharacters(value),
  },
  {
    label: "RAM (GB)",
    key: "ram",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
  },
  {
    label: "Color",
    key: "color",
    type: "text",
    validation: (value) => removeNumericCharacters(value),
  },
  { label: "Procesador", key: "processor", type: "text" },
  { label: "Sistema Operativo", key: "operatingSystem", type: "text" },
  {
    label: "Clasificación IP",
    key: "ipRating",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
  },
  {
    label: "Resistente a Salpicaduras",
    key: "splashResistant",
    type: "checkbox",
  },
  { label: "Resistente al Polvo", key: "dustResistant", type: "checkbox" },
  { label: "Resistente al Agua", key: "waterResistant", type: "checkbox" },
];

function MobileDeviceFeaturesManager({
  productId,
  setMobileDeviceId,
}: {
  productId: string;
  setMobileDeviceId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const mutationAddMobileDevice = useAddMobileDevice();

  const [isDisabled, setIsDisabled] = useState(false);

  const [mobileDevice, setMobileDevice] = useState(() =>
    mobileDeviceFields.reduce((acc, field) => {
      acc[field.key] = field.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, string | boolean>)
  );

  const addMobileDevice = async () => {
    if (
      !mobileDevice.internalMemory ||
      !mobileDevice.internalMemoryType ||
      !mobileDevice.ram ||
      !mobileDevice.color ||
      !mobileDevice.processor ||
      !mobileDevice.operatingSystem
    ) {
      toast.error("Ingresar toda la información obligatoria", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    const mobileDeviceRequest: AddMobileDeviceInterface = {
      internalMemory: Number(mobileDevice.internalMemory),
      internalMemoryType: mobileDevice.internalMemoryType.toString(),
      ram: Number(mobileDevice.ram),
      color: mobileDevice.color.toString(),
      processor: mobileDevice.processor.toString(),
      operatingSystem: mobileDevice.operatingSystem.toString(),
      ipRating: "IP" + mobileDevice.ipRating.toString(),
      splashResistant: Boolean(mobileDevice.splashResistant),
      dustResistant: Boolean(mobileDevice.dustResistant),
      waterResistant: Boolean(mobileDevice.waterResistant),
    };

    try {
      const mobileDeviceResponse = await mutationAddMobileDevice.mutateAsync({
        productId,
        mobileDeviceData: mobileDeviceRequest,
      });
      setMobileDeviceId(mobileDeviceResponse.mobileDevice.mobileDeviceid);
      setIsDisabled(true);
    } catch (error) {
      return;
    }
  };

  return (
    <FeatureTable
      data={mobileDevice}
      setData={setMobileDevice}
      isDisabled={isDisabled}
      fields={mobileDeviceFields}
      title="Características Generales"
      manageFeature={addMobileDevice}
      buttonText="agregar"
    />
  );
}

export default MobileDeviceFeaturesManager;
