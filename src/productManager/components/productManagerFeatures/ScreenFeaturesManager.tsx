import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { GetScreenResponseInterface } from "@/share/interfaces/getScreenResponseInterface";
import { AddScreenInterface } from "@/addProduct/interfaces/addScreenInterface";
import { ScreenInterface } from "@/share/interfaces/screenInterface";

import { validateNonNegativeNumber } from "@/share/utils/validateNonNegativeNumber";

import { useUpdateScreen } from "@/updateProduct/hook/useUpdateScreen";
import { useAddScreen } from "@/addProduct/hook/useAddScreen";

import FeatureTable from "@/share/components/FeatureTable";
import { useGetScreen } from "@/share/hook/useGetScreen";

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
    validation: (value) => validateNonNegativeNumber(value),
  },
  {
    label: "Tasa de refresco (Hz)",
    key: "refreshRate",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
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
  const screenResponse = productId ? useGetScreen(productId) : null;
  const mutationAddScreen = useAddScreen();
  const mutationUpdateScreen = useUpdateScreen();

  const screenDataResponse = screenResponse?.data ?? null;

  const [isDisabled, setIsDisabled] = useState(true);

  const [screen, setScreen] = useState<Record<string, string | boolean>>(() =>
    screenFields.reduce((acc, field) => {
      acc[field.key] = field.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, string | boolean>)
  );

  const parseScreenData = (screenData?: GetScreenResponseInterface | null) => {
    return screenFields.reduce((acc, field) => {
      let value = screenData?.screen[0]?.[field.key as keyof ScreenInterface];

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
    if (productId && screenDataResponse) {
      setScreen(parseScreenData(screenDataResponse));
    }
  }, [productId, screenDataResponse]);

  const handleCancel = useCallback(() => {
    if (screenResponse?.data) {
      setScreen(parseScreenData(screenResponse.data));
    }
    setIsDisabled(true);
  }, [screenResponse, setScreen, setIsDisabled]);

  const screenManager = async () => {
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

    if (!productId && screenDataResponse === null) {
      try {
        await mutationAddScreen.mutateAsync({
          productId,
          screenData: screenRequest,
        });
        setIsDisabled(true);
        return;
      } catch (error) {
        return;
      }
    }

    if (productId && screenDataResponse !== null) {
      try {
        await mutationUpdateScreen.mutateAsync({
          screenId: screenDataResponse.screen[0].screenId,
          screenData: screenRequest,
        });
        setIsDisabled(true);
        return
      } catch (error) {
        return;
      }
    }
  };

  return (
    <FeatureTable
      setDisabled={setIsDisabled}
      data={screen}
      setData={setScreen}
      isDisabled={isDisabled}
      fields={screenFields}
      title="Pantalla"
      manageFeature={screenManager}
      buttonText={"hacer cambios"}
      handleCancel={handleCancel}
    />
  );
}

export default ScreenFeaturesManager;
