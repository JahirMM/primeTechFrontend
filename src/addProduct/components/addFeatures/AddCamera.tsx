import { useState } from "react";
import { toast } from "sonner";

import { validateNonNegativeNumber } from "@/share/utils/validateNonNegativeNumber";
import { removeNumericCharacters } from "@/share/utils/removeNumericCharacters";

import { AddCameraInterface } from "@/addProduct/interfaces/addCameraInterface";

import { useAddCamera } from "@/addProduct/hook/useAddCamera";

import FeatureTable from "@/share/components/FeatureTable";

interface CameraField {
  label: string;
  key: string;
  type: "text" | "number" | "checkbox";
  validation?: (value: string) => string;
}

const cameraFields: CameraField[] = [
  { label: "Tipo", key: "type", type: "text", validation: (value) => removeNumericCharacters(value) },
  { label: "Resolución (MP)", key: "resolution", type: "text", validation: (value) => validateNonNegativeNumber(value) },
  { label: "Apertura", key: "aperture", type: "text" },
  { label: "Zoom óptico", key: "opticalZoom", type: "text" },
  { label: "Zoom digital", key: "digitalZoom", type: "text" },
  { label: "Características", key: "feature", type: "text" },
];

function AddCamera({ productId }: { productId: string }) {
  const mutationAddCamera = useAddCamera();

  const [isDisabled, setIsDisabled] = useState(false);

  const [camera, setCamera] = useState(() =>
    cameraFields.reduce((acc, field) => {
      acc[field.key] = "";
      return acc;
    }, {} as Record<string, string | boolean>)
  );

  const addCamera = async () => {
    if (!camera.type || !camera.resolution || !camera.aperture) {
      toast.error("Ingresar toda la información obligatoria", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    if (camera.type !== "front" && camera.type !== "rear") {
      toast.error("El tipo de cámara solo puede ser 'front' o 'rear'", {
        duration: 5000,
        style: { backgroundColor: "#ac9a4b", color: "black" },
      });
      return;
    }

    const cameraRequest: AddCameraInterface = {
      type: camera.type,
      resolution: camera.resolution + " MP",
      aperture: camera.aperture.toString(),
      opticalZoom: camera.opticalZoom.toString() || "N/A",
      digitalZoom: camera.digitalZoom.toString() || "N/A",
      feature: camera.feature.toString(),
    };

    try {
      await mutationAddCamera.mutateAsync({
        productId,
        cameraData: cameraRequest,
      });
      setIsDisabled(true);
    } catch (error) {
      return;
    }
  };

  return (
    <FeatureTable
      data={camera}
      setData={setCamera}
      isDisabled={isDisabled}
      fields={cameraFields}
      title="Cámaras"
      manageFeature={addCamera}
      buttonText="agregar"
    />
  );
}

export default AddCamera;
