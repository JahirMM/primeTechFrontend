import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { AddMobileDeviceInterface } from "@/addProduct/interfaces/addMobileDeviceInterface";

import { validateNonNegativeNumber } from "@/share/utils/validateNonNegativeNumber";
import { removeNumericCharacters } from "@/share/utils/removeNumericCharacters";

import { useAddMobileDevice } from "@/addProduct/hook/useAddMobileDevice";

import FeatureTable from "@/share/components/FeatureTable";
import { useUpdateMobileDevice } from "@/updateProduct/hook/useUpdateMobileDevice";
import { useGetMobileDevice } from "@/share/hook/useGetMobileDevice";
import { GetMobileDeviceResponseInterface } from "@/share/interfaces/getMobileDeviceResponseInterface";
import { MobileDeviceInterface } from "@/share/interfaces/mobileDeviceInterface";

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
  const mobileDeviceResponse = useGetMobileDevice(productId);
  const mutationAddMobileDevice = useAddMobileDevice();
  const mutationUpdateMobileDevice = useUpdateMobileDevice();

  const mobileDeviceDataResponse = mobileDeviceResponse?.data ?? null;

  const [isDisabled, setIsDisabled] = useState(true);

  const [mobileDevice, setMobileDevice] = useState(() =>
    mobileDeviceFields.reduce((acc, field) => {
      acc[field.key] = field.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, string | boolean>)
  );

  const parseMobileDeviceData = (
    mobileDeviceData?: GetMobileDeviceResponseInterface | null
  ) => {
    return mobileDeviceFields.reduce((acc, field) => {
      const value =
        mobileDeviceData?.mobileDevice[0]?.[
          field.key as keyof MobileDeviceInterface
        ];

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
    if (productId && mobileDeviceDataResponse) {
      if (mobileDeviceDataResponse.mobileDevice?.length > 0) {
        setMobileDevice(parseMobileDeviceData(mobileDeviceDataResponse));
        setMobileDeviceId(
          mobileDeviceDataResponse.mobileDevice[0].mobileDeviceid
        );
      } else {
        setMobileDeviceId(null);
      }
    }
  }, [productId, mobileDeviceDataResponse, setMobileDeviceId]);

  const handleCancel = useCallback(() => {
    if (mobileDeviceResponse?.data) {
      setMobileDevice(parseMobileDeviceData(mobileDeviceResponse.data));
    }
    setIsDisabled(true);
  }, [mobileDeviceResponse, setMobileDevice, setIsDisabled]);

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

    if (mobileDeviceResponse?.data?.mobileDevice.length === 0) {
      try {
        const mobileDeviceResponse = await mutationAddMobileDevice.mutateAsync({
          productId,
          mobileDeviceData: mobileDeviceRequest,
        });
        setMobileDeviceId(mobileDeviceResponse.mobileDevice.mobileDeviceid);
        setIsDisabled(true);
      } catch {
        toast.error("Ocurrió un error al agregar.");
        return;
      }
    }

    if (mobileDeviceDataResponse && mobileDeviceResponse?.data?.mobileDevice) {
      if (mobileDeviceResponse.data.mobileDevice.length > 0) {
        try {
          await mutationUpdateMobileDevice.mutateAsync({
            mobileDeviceId:
              mobileDeviceDataResponse.mobileDevice[0].mobileDeviceid,
            mobileDeviceData: mobileDeviceRequest,
          });
          setIsDisabled(true);
        } catch {
          toast.error("Ocurrió un error al actualizar");
          return;
        }
      }
    }
  };

  return (
    <FeatureTable
      setDisabled={setIsDisabled}
      data={mobileDevice}
      setData={setMobileDevice}
      isDisabled={isDisabled}
      fields={mobileDeviceFields}
      title="Características Generales"
      manageFeature={addMobileDevice}
      handleCancel={handleCancel}
    />
  );
}

export default MobileDeviceFeaturesManager;
