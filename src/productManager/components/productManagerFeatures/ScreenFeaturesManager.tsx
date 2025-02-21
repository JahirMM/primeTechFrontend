import { useState } from "react";
import { toast } from "sonner";

import { AddScreenInterface } from "@/addProduct/interfaces/addScreenInterface";

import { validateNonNegativeNumber } from "@/share/utils/validateNonNegativeNumber";

import { useAddScreen } from "@/addProduct/hook/useAddScreen";

import FeatureTable from "@/share/components/FeatureTable";

interface ScreenField {
  label: string;
  key: string;
  type: "text" | "number" | "checkbox";
  validation?: (value: string) => string;
}

const screenFields: ScreenField[] = [
  { label: "Resolución", key: "resolution", type: "text" },
  {
    label: "Densidad de píxeles (ppi)",
    key: "pixelDensity",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value)
  },
  {
    label: "Tasa de refresco (Hz)",
    key: "refreshRate",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value)
  },
  { label: "Tipo de pantalla", key: "screenType", type: "text" },
  {
    label: "Tamaño de pantalla",
    key: "screenSize",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
  },
];

function ScreenFeaturesManager({ productId }: { productId: string }) {
  const mutationAddScreen = useAddScreen();

  const [isDisabled, setIsDisabled] = useState(false);

  const [screen, setScreen] = useState(() =>
    screenFields.reduce((acc, field) => {
      acc[field.key] = field.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, string | boolean>)
  );

  const addScreen = async () => {
    if (
      !screen.resolution ||
      !screen.pixelDensity ||
      !screen.refreshRate ||
      !screen.screenType ||
      !screen.screenSize
    ) {
      toast.error("Ingresar toda la información obligatoria", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    const screenRequest: AddScreenInterface = {
      resolution: screen.resolution.toString(),
      pixelDensity: screen.pixelDensity.toString() + " ppi",
      refreshRate: screen.refreshRate.toString() + "Hz",
      screenType: screen.screenType.toString(),
      screenSize: Number(screen.screenSize),
    };

    try {
      await mutationAddScreen.mutateAsync({
        productId,
        screenData: screenRequest,
      });
      setIsDisabled(true);
    } catch (error) {
      return;
    }
  };

  return (
    <FeatureTable
      data={screen}
      setData={setScreen}
      isDisabled={isDisabled}
      fields={screenFields}
      title="Pantalla"
      manageFeature={addScreen}
      buttonText="agregar"
    />
  );
}

export default ScreenFeaturesManager;
