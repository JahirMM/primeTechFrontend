import { useState } from "react";
import { toast } from "sonner";

import AddFeatureTable from "@/addProduct/components/addFeatures/AddFeatureTable";
import { useAddCamera } from "@/addProduct/hook/useAddCamera";

function AddCamera({ productId }: { productId: string }) {
  const mutationAddCamera = useAddCamera();

  const [isDisabled, setIsDisabled] = useState(false);
  const [camera, setCamera] = useState({
    Tipo: "",
    Resolución: "",
    Apertura: "",
    "Zoom óptico": "",
    "Zoom digital": "",
    Características: "",
  });

  const addCamera = async () => {
    if (!camera.Tipo || !camera.Resolución || !camera.Apertura) {
      toast.error("Ingresar toda la información obligatoria", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    if (camera.Tipo !== "front" && camera.Tipo !== "rear") {
      toast.error("El tipo de cámara solo puede ser 'front' o 'rear'", {
        duration: 5000,
        style: { backgroundColor: "#ac9a4b", color: "black" },
      });
      return;
    }

    const cameraRequest = {
      type: camera.Tipo,
      resolution: camera.Resolución + " MP",
      aperture: camera.Apertura,
      opticalZoom: camera["Zoom óptico"] || "N/A",
      digitalZoom: camera["Zoom digital"] || "N/A",
      feature: camera.Características,
    };

    try {
      await mutationAddCamera.mutateAsync({
        productId: productId,
        cameraData: cameraRequest,
      });
      setIsDisabled(true);
    } catch (error) {
      return;
    }
  };

  return (
    <div className="sm:col-start-1 sm:col-end-3">
      <div className="flex items-center justify-between my-6">
        <h2 className="text-lg font-semibold">Cámaras</h2>
        <button
          className="px-2 py-1 text-xs text-white rounded-lg bg-primaryColor"
          onClick={addCamera}
        >
          Agregar
        </button>
      </div>
      <AddFeatureTable
        data={camera}
        setData={setCamera}
        isDisabled={isDisabled}
      />
    </div>
  );
}

export default AddCamera;
