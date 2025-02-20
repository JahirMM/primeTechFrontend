import { useState } from "react";
import { toast } from "sonner";

import { validateNonNegativeNumber } from "@/share/utils/validateNonNegativeNumber";
import { removeNumericCharacters } from "@/share/utils/removeNumericCharacters";

import { AddCameraInterface } from "@/addProduct/interfaces/addCameraInterface";

import { useAddCamera } from "@/addProduct/hook/useAddCamera";

import FeatureTable from "@/share/components/FeatureTable";

interface AddCameraProps {
  productId: string;
  deviceType: "mobile" | "laptop" | "other" | "";
}

interface CameraFields {
  label: string;
  key: string;
  type: "text" | "number" | "checkbox";
  validation?: (value: string) => string;
}

const cameraFields: CameraFields[] = [
  {
    label: "Tipo",
    key: "type",
    type: "text",
    validation: (value) => removeNumericCharacters(value),
  },
  {
    label: "Resolución (MP)",
    key: "resolution",
    type: "text",
    validation: (value) => validateNonNegativeNumber(value),
  },
  { label: "Apertura", key: "aperture", type: "text" },
  {
    label: "Zoom óptico",
    key: "opticalZoom",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
  },
  {
    label: "Zoom digital",
    key: "digitalZoom",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
  },
  { label: "Características", key: "feature", type: "text" },
];

function AddCamera({ productId, deviceType }: AddCameraProps) {
  const mutationAddCamera = useAddCamera();
  const maxCameras = deviceType === "mobile" ? 5 : 1;

  const [cameras, setCameras] = useState<AddCameraInterface[]>([]);

  const [currentCamera, setCurrentCamera] = useState<
    Record<string, string | boolean>
  >({
    type: "",
    resolution: "",
    aperture: "",
    opticalZoom: "",
    digitalZoom: "",
    feature: "",
  });

  const handleAddCamera = async () => {
    if (cameras.length >= maxCameras) {
      toast.error(`Solo puedes agregar hasta ${maxCameras} cámaras.`, {
        duration: 5000,
        style: { backgroundColor: "#a28d20", color: "white" },
      });
      return;
    }

    if (
      !currentCamera.type ||
      !currentCamera.resolution ||
      !currentCamera.aperture
    ) {
      toast.error("Ingresar toda la información obligatoria.", {
        duration: 5000,
        style: { backgroundColor: "#a28d20", color: "white" },
      });
      return;
    }

    if (currentCamera.type !== "front" && currentCamera.type !== "rear") {
      toast.error("El tipo de cámara solo puede ser 'front' o 'rear'.", {
        duration: 5000,
        style: { backgroundColor: "#a28d20", color: "white" },
      });
      return;
    }

    const cameraToAdd: AddCameraInterface = {
      type: currentCamera.type as string,
      resolution: currentCamera.resolution + " MP",
      aperture: currentCamera.aperture.toString(),
      opticalZoom: currentCamera.opticalZoom.toString() + "px" || "N/A",
      digitalZoom: currentCamera.digitalZoom.toString() + "px" || "N/A",
      feature: currentCamera.feature.toString(),
    };

    try {
      await mutationAddCamera.mutateAsync({
        productId,
        cameraData: cameraToAdd,
      });
      setCameras([...cameras, cameraToAdd]);
      setCurrentCamera({
        type: "",
        resolution: "",
        aperture: "",
        opticalZoom: "",
        digitalZoom: "",
        feature: "",
      });
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      <FeatureTable
        data={currentCamera}
        setData={setCurrentCamera}
        isDisabled={false}
        fields={cameraFields}
        title="Agregar Cámara"
        manageFeature={handleAddCamera}
        buttonText="Agregar"
      />

      <div className="pb-3">
        <h2 className="mt-4 text-lg font-semibold">Cámaras Agregadas</h2>
        {cameras.length > 0 && (
          <ul className="mt-2 list-disc list-inside">
            {cameras.map((camera, index) => (
              <li key={index}>
                {camera.type} - {camera.resolution} - {camera.aperture}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AddCamera;
