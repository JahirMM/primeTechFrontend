import { useState } from "react";
import { toast } from "sonner";

import AddFeatureTable from "@/addProduct/components/addFeatures/AddFeatureTable";
import { useAddScreen } from "@/addProduct/hook/useAddScreen";

function AddScreen({ productId }: { productId: string }) {
  const mutationAddScreen = useAddScreen();

  const [isDisabled, setIsDisabled] = useState(false);
  const [screen, setScreen] = useState({
    Resolución: "",
    "Densidad de píxeles (ppi)": "",
    "Tasa de refresco (Hz)": "",
    "Tipo de pantalla": "",
    "Tamaño de pantalla": "",
  });

  const addScreen = async () => {
    if (
      !screen.Resolución ||
      !screen["Densidad de píxeles (ppi)"] ||
      !screen["Tasa de refresco (Hz)"] ||
      !screen["Tipo de pantalla"] ||
      !screen["Tamaño de pantalla"]
    ) {
      toast.error("Ingresar toda la información", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    const screenRequest = {
      resolution: screen.Resolución,
      pixelDensity: screen["Densidad de píxeles (ppi)"] + "ppi",
      refreshRate: screen["Tasa de refresco (Hz)"] + "Hz",
      screenType: screen["Tipo de pantalla"],
      screenSize: Number(screen["Tamaño de pantalla"]),
    };

    try {
      await mutationAddScreen.mutateAsync({
        productId: productId,
        screenData: screenRequest,
      });
      setIsDisabled(true);
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between my-6">
        <h2 className="text-lg font-semibold">Pantalla</h2>
        <button
          className="px-2 py-1 text-xs text-white rounded-lg bg-primaryColor"
          onClick={addScreen}
        >
          Agregar
        </button>
      </div>
      <AddFeatureTable
        data={screen}
        setData={setScreen}
        isDisabled={isDisabled}
      />
    </div>
  );
}

export default AddScreen;
