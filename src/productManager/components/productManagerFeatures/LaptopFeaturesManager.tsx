import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { AddLaptopInterface } from "@/addProduct/interfaces/addLaptopInterface";

import { validateNonNegativeNumber } from "@/share/utils/validateNonNegativeNumber";
import { removeNumericCharacters } from "@/share/utils/removeNumericCharacters";

import { useAddLaptop } from "@/addProduct/hook/useAddLaptop";

import FeatureTable from "@/share/components/FeatureTable";
import { useUpdateLaptop } from "@/updateProduct/hook/useUpdateLaptop";
import { useGetLaptop } from "@/share/hook/useGetLaptop";
import { GetLaptopResponseInterface } from "@/share/interfaces/getLaptopResponseInterface";
import { LaptopInterface } from "@/share/interfaces/laptopInterface";

const laptopFields: {
  label: string;
  key: string;
  type: "text" | "number" | "checkbox";
  validation?: (value: string) => string;
}[] = [
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
  { label: "Pantalla Táctil", key: "touchscreen", type: "checkbox" },
  { label: "Sistema Operativo", key: "operatingSystem", type: "text" },
  { label: "Idioma del Teclado", key: "keyboardLanguage", type: "text" },
  { label: "Teclado Retroiluminado", key: "backlitKeyboard", type: "checkbox" },
  { label: "Tarjeta Gráfica", key: "graphicCard", type: "text" },
  {
    label: "Puertos USB",
    key: "usbPorts",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
  },
  {
    label: "Puertos USB-C",
    key: "usbCPorts",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
  },
  {
    label: "Puertos HDMI",
    key: "hdmiPorts",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
  },
  { label: "WiFi", key: "withWifi", type: "checkbox" },
  { label: "Bluetooth", key: "withBluetooth", type: "checkbox" },
  { label: "Puerto Ethernet", key: "withEthernetPort", type: "checkbox" },
  {
    label: "Almacenamiento SSD (GB)",
    key: "ssdStorage",
    type: "text",
    validation: (value) => validateNonNegativeNumber(value),
  },
  {
    label: "Almacenamiento HDD (GB)",
    key: "hddStorage",
    type: "text",
    validation: (value) => validateNonNegativeNumber(value),
  },
  {
    label: "Cantidad de Parlantes",
    key: "quantitySpeakers",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
  },
  {
    label: "Micrófono",
    key: "microphone",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
  },
];

function LaptopFeaturesManager({ productId }: { productId: string }) {
  const laptopResponse = productId ? useGetLaptop(productId) : null;
  const mutationAddLaptop = useAddLaptop();
  const mutationUpdateLaptop = useUpdateLaptop();

  const laptopDataResponse = laptopResponse?.data ?? null;

  const [isDisabled, setIsDisabled] = useState(true);

  const [laptop, setLaptop] = useState(() =>
    laptopFields.reduce((acc, field) => {
      acc[field.key] = field.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, string | boolean>)
  );

  const parseLaptopData = (laptopData?: GetLaptopResponseInterface | null) => {
    return laptopFields.reduce((acc, field) => {
      let value = laptopData?.laptop[0]?.[field.key as keyof LaptopInterface];

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
    if (productId && laptopDataResponse) {
      if (laptopDataResponse.laptop?.length > 0) {
        setLaptop(parseLaptopData(laptopDataResponse));
      }
    }
  }, [productId, laptopDataResponse]);

  const handleCancel = useCallback(() => {
    if (laptopResponse?.data) {
      setLaptop(parseLaptopData(laptopResponse.data));
    }
    setIsDisabled(true);
  }, [laptopResponse, setLaptop, setIsDisabled]);

  const addLaptop = async () => {
    if (
      !laptop.ram ||
      !laptop.color ||
      !laptop.processor ||
      !laptop.operatingSystem ||
      !laptop.keyboardLanguage
    ) {
      toast.error("Ingresar toda la información obligatoria", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    const laptopRequest: AddLaptopInterface = {
      ram: Number(laptop.ram),
      color: laptop.color.toString(),
      processor: laptop.processor.toString(),
      touchscreen: Boolean(laptop.touchscreen),
      operatingSystem: laptop.operatingSystem.toString(),
      keyboardLanguage: laptop.keyboardLanguage.toString(),
      backlitKeyboard: Boolean(laptop.backlitKeyboard),
      graphicCard: laptop.graphicCard.toString(),
      usbPorts: Number(laptop.usbPorts),
      usbCPorts: Number(laptop.usbCPorts),
      hdmiPorts: Number(laptop.hdmiPorts),
      withWifi: Boolean(laptop.withWifi),
      withBluetooth: Boolean(laptop.withBluetooth),
      withEthernetPort: Boolean(laptop.withEthernetPort),
      ssdStorage: Number(laptop.ssdStorage),
      hddStorage: Number(laptop.hddStorage),
      quantitySpeakers: Number(laptop.quantitySpeakers),
      microphone: Number(laptop.microphone),
    };

    if (!productId && laptopDataResponse === null) {
      try {
        await mutationAddLaptop.mutateAsync({
          productId,
          laptopData: laptopRequest,
        });
        setIsDisabled(true);
      } catch (error) {
        return;
      }
    }

    if (productId && laptopDataResponse !== null) {
      try {
        await mutationUpdateLaptop.mutateAsync({
          laptopId: laptopDataResponse.laptop[0].laptopId,
          laptopData: laptopRequest,
        });
        setIsDisabled(true);
      } catch (error) {
        return;
      }
    }
  };

  return (
    <FeatureTable
      setDisabled={setIsDisabled}
      data={laptop}
      setData={setLaptop}
      isDisabled={isDisabled}
      fields={laptopFields}
      title="Características Generales"
      manageFeature={addLaptop}
      handleCancel={handleCancel}
    />
  );
}

export default LaptopFeaturesManager;
