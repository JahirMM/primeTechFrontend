import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

import { useDeleteCamera } from "@/productManager/hook/useDeleteCamera";
import { useUpdateCamera } from "@/updateProduct/hook/useUpdateCamera";
import { useAddCamera } from "@/addProduct/hook/useAddCamera";
import { useGetCameras } from "@/share/hook/useGetCameras";

import { CameraInterfa } from "@/share/interfaces/cameraInterface";

import TrashIcon from "@/icons/TrashIcon";

interface CameraFeaturesManagerProps {
  productId: string;
  deviceType: "mobile" | "laptop" | "other" | "";
}

function CameraFeaturesManager({
  productId,
  deviceType,
}: CameraFeaturesManagerProps) {
  const cameraResponse = productId ? useGetCameras(productId) : null;
  const mutationUpdateCamera = useUpdateCamera();
  const mutationDeleteCamera = useDeleteCamera();
  const mutationAddCamera = useAddCamera();

  const cameraDataResponse = cameraResponse?.data ?? null;

  const [cameras, setCameras] = useState<CameraInterfa[]>([]);
  const [originalCameras, setOriginalCameras] = useState<CameraInterfa[]>([]);
  const [editingCameras, setEditingCameras] = useState<Record<string, boolean>>(
    {}
  );

  const maxCameras = deviceType === "mobile" ? 5 : 1;

  useEffect(() => {
    if (cameraDataResponse?.camera) {
      const formattedCameras = cameraDataResponse.camera.map((camera) => ({
        ...camera,
        resolution: camera.resolution.replace(/\D/g, ""),
        digitalZoom: camera.digitalZoom.replace(/\D/g, ""),
        opticalZoom: camera.opticalZoom.replace(/\D/g, ""),
      }));

      setCameras(formattedCameras);
      setOriginalCameras(formattedCameras);
      setEditingCameras(
        Object.fromEntries(formattedCameras.map((cam) => [cam.cameraId, false]))
      );
    }
  }, [cameraDataResponse]);

  const numericFields = ["resolution", "opticalZoom", "digitalZoom"];

  const handleChange = (
    cameraId: string,
    field: keyof CameraInterfa,
    value: string
  ) => {
    if (numericFields.includes(field) && Number(value) < 0) {
      console.log("PERRO");

      setCameras((prevCameras) =>
        prevCameras.map((cam) =>
          cam.cameraId === cameraId ? { ...cam, [field]: "" } : cam
        )
      );
      return;
    }

    setCameras((prevCameras) =>
      prevCameras.map((cam) =>
        cam.cameraId === cameraId ? { ...cam, [field]: value } : cam
      )
    );
  };

  const handleCancelEdit = (cameraId: string) => {
    const originalCamera = originalCameras.find(
      (cam) => cam.cameraId === cameraId
    );
    if (originalCamera) {
      setCameras((prevCameras) =>
        prevCameras.map((cam) =>
          cam.cameraId === cameraId ? { ...originalCamera } : cam
        )
      );
    }
    setEditingCameras((prev) => ({ ...prev, [cameraId]: false }));
  };

  const handleAddCamera = () => {
    const newCamera: CameraInterfa = {
      cameraId: uuidv4(),
      type: "front",
      resolution: "",
      aperture: "",
      opticalZoom: "",
      digitalZoom: "",
      feature: "",
    };
    setCameras([...cameras, newCamera]);
    setEditingCameras((prev) => ({ ...prev, [newCamera.cameraId]: true }));
  };

  const saveCamera = (camera: CameraInterfa) => {
    if (!camera.type || !camera.resolution || !camera.aperture) {
      toast.error("Por favor llenar todos los campos", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }
    const cameraRequest = {
      type: camera.type,
      resolution: camera.resolution + " MP",
      aperture: camera.aperture,
      opticalZoom: camera.opticalZoom ? camera.opticalZoom + "px" : "N/A",
      digitalZoom: camera.digitalZoom ? camera.digitalZoom + "px" : "N/A",
      feature: camera.feature,
    };

    if (
      !cameraDataResponse?.camera.some(
        (cam) => cam.cameraId === camera.cameraId
      )
    ) {
      mutationAddCamera.mutate({
        productId: productId,
        cameraData: cameraRequest,
      });
      return;
    }

    if (
      productId &&
      cameraDataResponse?.camera.some((cam) => cam.cameraId === camera.cameraId)
    ) {
      mutationUpdateCamera.mutate({
        cameraId: camera.cameraId,
        cameraData: cameraRequest,
      });
    }

    setEditingCameras((prev) => ({ ...prev, [camera.cameraId]: false }));
  };

  const deleteCamera = (cameraId: string) => {
    if (cameraDataResponse?.camera.some((cam) => cam.cameraId === cameraId)) {
      mutationDeleteCamera.mutate({ cameraId: cameraId });
    } else {
      setCameras((prevCameras) =>
        prevCameras.filter((cam) => cam.cameraId !== cameraId)
      );

      setEditingCameras((prev) => {
        const updated = { ...prev };
        delete updated[cameraId];
        return updated;
      });
    }
  };

  return (
    <>
      <section className="sm:col-span-2">
        <div className="flex items-center justify-between my-6">
          <h2 className="text-lg font-semibold">Camara</h2>
        </div>
        <div className="grid items-center grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cameras.length > 0 &&
            cameras.map((camera, index) => (
              <div key={camera.cameraId} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Camara {index + 1}</span>
                  <div className="flex items-center gap-2">
                    {!editingCameras[camera.cameraId] ? (
                      <button
                        className="px-3 py-2 text-xs text-white rounded-lg bg-primaryColor"
                        onClick={() =>
                          setEditingCameras((prev) => ({
                            ...prev,
                            [camera.cameraId]: true,
                          }))
                        }
                      >
                        Hacer cambios
                      </button>
                    ) : (
                      <>
                        <button
                          className="px-3 py-2 text-xs text-white rounded-lg bg-primaryColor"
                          onClick={() => saveCamera(camera)}
                        >
                          Confirmar
                        </button>
                        <button
                          className="px-3 py-2 text-xs text-black border border-black rounded-lg hover:text-white hover:bg-primaryColor hover:border-primaryColor"
                          onClick={() => handleCancelEdit(camera.cameraId)}
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                    {!editingCameras[camera.cameraId] && (
                      <TrashIcon
                        className="text-red-500 cursor-pointer size-4"
                        onClick={() => deleteCamera(camera.cameraId)}
                      />
                    )}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200 rounded-lg">
                    <tbody>
                      <tr>
                        <th className="p-3 font-medium text-left">Tipo</th>
                        <td className="p-3">
                          <select
                            className="w-full p-1 border border-gray-300 rounded"
                            disabled={!editingCameras[camera.cameraId]}
                            value={camera.type}
                            onChange={(e) =>
                              handleChange(
                                camera.cameraId,
                                "type",
                                e.target.value
                              )
                            }
                          >
                            <option value="front">Frontal</option>
                            <option value="rear">Trasera</option>
                          </select>
                        </td>
                      </tr>
                      <tr className="even:bg-gray-100 odd:bg-white">
                        <th className="p-3 font-medium text-left">
                          Resolución (MP)
                        </th>
                        <td className="p-3">
                          <input
                            type="number"
                            name="resolution"
                            className="w-full p-1 border border-gray-300 rounded"
                            disabled={!editingCameras[camera.cameraId]}
                            value={camera.resolution}
                            onChange={(e) =>
                              handleChange(
                                camera.cameraId,
                                "resolution",
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr className="even:bg-gray-100 odd:bg-white">
                        <th className="p-3 font-medium text-left">Apertura</th>
                        <td className="p-3">
                          <input
                            type="text"
                            name="aperture"
                            className="w-full p-1 border border-gray-300 rounded"
                            disabled={!editingCameras[camera.cameraId]}
                            value={camera.aperture}
                            onChange={(e) =>
                              handleChange(
                                camera.cameraId,
                                "aperture",
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr className="even:bg-gray-100 odd:bg-white">
                        <th className="p-3 font-medium text-left">
                          Zoom óptico
                        </th>
                        <td className="p-3">
                          <input
                            type="number"
                            name="opticalZoom"
                            className="w-full p-1 border border-gray-300 rounded"
                            disabled={!editingCameras[camera.cameraId]}
                            value={camera.opticalZoom}
                            onChange={(e) =>
                              handleChange(
                                camera.cameraId,
                                "opticalZoom",
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr className="even:bg-gray-100 odd:bg-white">
                        <th className="p-3 font-medium text-left">
                          Zoom digital
                        </th>
                        <td className="p-3">
                          <input
                            type="number"
                            name="digitalZoom"
                            className="w-full p-1 border border-gray-300 rounded"
                            disabled={!editingCameras[camera.cameraId]}
                            value={camera.digitalZoom}
                            onChange={(e) =>
                              handleChange(
                                camera.cameraId,
                                "digitalZoom",
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr className="even:bg-gray-100 odd:bg-white">
                        <th className="p-3 font-medium text-left">
                          Características
                        </th>
                        <td className="p-3">
                          <input
                            type="text"
                            name="feature"
                            className="w-full p-1 border border-gray-300 rounded"
                            disabled={!editingCameras[camera.cameraId]}
                            value={camera.feature}
                            onChange={(e) =>
                              handleChange(
                                camera.cameraId,
                                "feature",
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          {productId && cameras.length < maxCameras && (
            <button
              onClick={handleAddCamera}
              className="flex items-center justify-center bg-gray-300 border border-gray-500 rounded-lg size-14"
            >
              <span className="text-2xl font-bold">+</span>
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default CameraFeaturesManager;
