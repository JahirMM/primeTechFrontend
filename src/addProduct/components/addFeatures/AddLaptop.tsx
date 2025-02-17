import { useState } from "react";
import { toast } from "sonner";

import AddFeatureTable from "@/addProduct/components/addFeatures/AddFeatureTable";
import { useAddLaptop } from "@/addProduct/hook/useAddLaptop";

function AddLaptop({ productId }: { productId: string }) {
  const mutationAddLaptop = useAddLaptop();

  const [isDisabled, setIsDisabled] = useState(false);
  const [laptop, setLaptop] = useState({
    RAM: "",
    Color: "",
    Procesador: "",
    PantallaTáctil: false,
    "Sistema Operativo": "",
    "Idioma del Teclado": "",
    "Teclado Retroiluminado": false,
    "Tarjeta Gráfica": "",
    "Puertos USB": "",
    "Puertos USB-C": "",
    "Puertos HDMI": "",
    WiFi: false,
    Bluetooth: false,
    "Puerto Ethernet": false,
    "Almacenamiento SSD": "",
    "Almacenamiento HDD": "",
    "Cantidad de Parlantes": "",
    Micrófono: "",
  });

  const addLaptop = async () => {
    if (
      !laptop.RAM ||
      !laptop.Color ||
      !laptop.Procesador ||
      !laptop["Sistema Operativo"] ||
      !laptop["Idioma del Teclado"]
    ) {
      toast.error("Ingresar toda la información obligatoria", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    const laptopRequest = {
      ram: Number(laptop.RAM),
      color: laptop.Color,
      processor: laptop.Procesador,
      touchscreen: laptop.PantallaTáctil,
      operatingSystem: laptop["Sistema Operativo"],
      keyboardLanguage: laptop["Idioma del Teclado"],
      backlitKeyboard: laptop["Teclado Retroiluminado"],
      graphicCard: laptop["Tarjeta Gráfica"],
      usbPorts: Number(laptop["Puertos USB"]),
      usbCPorts: Number(laptop["Puertos USB-C"]),
      hdmiPorts: Number(laptop["Puertos HDMI"]),
      withWifi: laptop.WiFi,
      withBluetooth: laptop.Bluetooth,
      withEthernetPort: laptop["Puerto Ethernet"],
      ssdStorage: Number(laptop["Almacenamiento SSD"]),
      hddStorage: Number(laptop["Almacenamiento HDD"]),
      quantitySpeakers: Number(laptop["Cantidad de Parlantes"]),
      microphone: Number(laptop.Micrófono),
    };

    try {
      await mutationAddLaptop.mutateAsync({
        productId: productId,
        laptopData: laptopRequest,
      });
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
          onClick={addLaptop}
        >
          Agregar
        </button>
      </div>
      <AddFeatureTable
        data={laptop}
        setData={setLaptop}
        isDisabled={isDisabled}
      />
    </div>
  );
}

export default AddLaptop;
