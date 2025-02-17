import { SetStateAction, useState } from "react";
import { toast } from "sonner";

import AddFeatureTable from "@/addProduct/components/addFeatures/AddFeatureTable";

import { useAddMobileDevice } from "@/addProduct/hook/useAddMobileDevice";

function AddMobileDevice({
  productId,
  setMobileDeviceId,
}: {
  productId: string;
  setMobileDeviceId: React.Dispatch<SetStateAction<string | null>>;
}) {
  const mutationAddMobileDevice = useAddMobileDevice();

  const [isDisabled, setIsDisabled] = useState(false);
  const [mobileDevice, setMobileDevice] = useState({
    "Memoria Interna": "",
    "Tipo de Memoria Interna": "",
    RAM: "",
    Color: "",
    Procesador: "",
    "Sistema Operativo": "",
    "Clasificación IP": "",
    "Resistente a Salpicaduras": false,
    "Resistente al Polvo": false,
    "Resistente al Agua": false,
  });

  const addMobileDevice = async () => {
    if (
      !mobileDevice.RAM ||
      !mobileDevice.Color ||
      !mobileDevice.Procesador ||
      !mobileDevice["Sistema Operativo"] ||
      !mobileDevice["Memoria Interna"] ||
      !mobileDevice["Tipo de Memoria Interna"]
    ) {
      toast.error("Ingresar toda la información", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    const mobileDeviceRequest = {
      internalMemory: Number(mobileDevice["Memoria Interna"]),
      internalMemoryType: mobileDevice["Tipo de Memoria Interna"],
      ram: Number(mobileDevice.RAM),
      color: mobileDevice.Color,
      processor: mobileDevice.Procesador,
      operatingSystem: mobileDevice["Sistema Operativo"],
      ipRating: mobileDevice["Clasificación IP"],
      splashResistant: mobileDevice["Resistente a Salpicaduras"],
      dustResistant: mobileDevice["Resistente al Polvo"],
      waterResistant: mobileDevice["Resistente al Agua"],
    };

    try {
      const mobileDeviceResponse = await mutationAddMobileDevice.mutateAsync({
        productId: productId,
        mobileDeviceData: mobileDeviceRequest,
      });
      setMobileDeviceId(mobileDeviceResponse.mobileDevice.mobileDeviceid);
      setIsDisabled(true);
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between my-6">
        <h2 className="text-lg font-semibold">Características Generales</h2>
        <button
          className="px-2 py-1 text-xs text-white rounded-lg bg-primaryColor"
          onClick={addMobileDevice}
        >
          Agregar
        </button>
      </div>
      <AddFeatureTable
        data={mobileDevice}
        setData={setMobileDevice}
        isDisabled={isDisabled}
      />
    </div>
  );
}

export default AddMobileDevice;
