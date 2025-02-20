import { useState } from "react";
import { toast } from "sonner";

import { AddLaptopInterface } from "@/addProduct/interfaces/addLaptopInterface";

import { validateNonNegativeNumber } from "@/share/utils/validateNonNegativeNumber";
import { removeNumericCharacters } from "@/share/utils/removeNumericCharacters";

import { useAddLaptop } from "@/addProduct/hook/useAddLaptop";

import FeatureTable from "@/share/components/FeatureTable";

const laptopFields: {
  label: string;
  key: string;
  type: "text" | "number" | "checkbox";
  validation?: (value: string) => string;
}[] = [
  { label: "RAM (GB)", key: "ram", type: "number", validation: (value) => validateNonNegativeNumber(value) },
  { label: "Color", key: "color", type: "text", validation: (value) => removeNumericCharacters(value) },
  { label: "Procesador", key: "processor", type: "text" },
  { label: "Pantalla Táctil", key: "touchscreen", type: "checkbox" },
  { label: "Sistema Operativo", key: "operatingSystem", type: "text" },
  { label: "Idioma del Teclado", key: "keyboardLanguage", type: "text" },
  { label: "Teclado Retroiluminado", key: "backlitKeyboard", type: "checkbox" },
  { label: "Tarjeta Gráfica", key: "graphicCard", type: "text" },
  { label: "Puertos USB", key: "usbPorts", type: "number", validation: (value) => validateNonNegativeNumber(value) },
  { label: "Puertos USB-C", key: "usbCPorts", type: "number", validation: (value) => validateNonNegativeNumber(value) },
  { label: "Puertos HDMI", key: "hdmiPorts", type: "number", validation: (value) => validateNonNegativeNumber(value) },
  { label: "WiFi", key: "withWifi", type: "checkbox" },
  { label: "Bluetooth", key: "withBluetooth", type: "checkbox" },
  { label: "Puerto Ethernet", key: "withEthernetPort", type: "checkbox" },
  { label: "Almacenamiento SSD (GB)", key: "ssdStorage", type: "text", validation: (value) => validateNonNegativeNumber(value) },
  { label: "Almacenamiento HDD (GB)", key: "hddStorage", type: "text", validation: (value) => validateNonNegativeNumber(value) },
  { label: "Cantidad de Parlantes", key: "quantitySpeakers", type: "number", validation: (value) => validateNonNegativeNumber(value) },
  { label: "Micrófono", key: "microphone", type: "number", validation: (value) => validateNonNegativeNumber(value) },
];

function AddLaptop({ productId }: { productId: string }) {
  const mutationAddLaptop = useAddLaptop();

  const [isDisabled, setIsDisabled] = useState(false);

  const [laptop, setLaptop] = useState(() =>
    laptopFields.reduce((acc, field) => {
      acc[field.key] = field.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, string | boolean>)
  );

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

    try {
      await mutationAddLaptop.mutateAsync({
        productId,
        laptopData: laptopRequest,
      });
      setIsDisabled(true);
    } catch (error) {
      return;
    }
  };

  return (
    <FeatureTable
      data={laptop}
      setData={setLaptop}
      isDisabled={isDisabled}
      fields={laptopFields}
      title="Características Generales"
      manageFeature={addLaptop}
      buttonText="agregar"
    />
  );
}

export default AddLaptop;
