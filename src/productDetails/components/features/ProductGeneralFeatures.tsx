import FeatureTableSkeleton from "@/productDetails/skeletons/FeatureTableSkeleton";
import FeatureTable from "@/productDetails/components/features/FeatureTable";

import { FeatureData } from "@/productDetails/interfaces/featureDataInterface";

import { useGetMobileDevice } from "@/share/hook/useGetMobileDevice";
import { useGetLaptop } from "@/share/hook/useGetLaptop";

function ProductGeneralFeatures({
  productId,
  deviceType,
}: {
  productId: string;
  deviceType: string;
}) {
  const mobileQuery = useGetMobileDevice(productId);
  const laptopQuery = useGetLaptop(productId);

  let additionalData: FeatureData | null = null;
  let isAdditionalLoading = false;
  let hasAdditionalError = false;

  if (deviceType === "mobile") {
    isAdditionalLoading = mobileQuery.isLoading;
    hasAdditionalError = mobileQuery.isError;

    if (
      mobileQuery.data?.mobileDevice &&
      mobileQuery.data?.mobileDevice?.length > 0
    ) {
      const mobile = mobileQuery.data.mobileDevice[0];
      additionalData = {
        "Memoria interna": `${mobile.internalMemory} ${mobile.internalMemoryType}`,
        "Memoria RAM": `${mobile.ram} GB`,
        Color: mobile.color,
        Procesador: mobile.processor,
        "Sistema operativo": mobile.operatingSystem,
        "Resistencia al agua": mobile.waterResistant ? "Sí" : "No",
        "Resistencia al polvo": mobile.dustResistant ? "Sí" : "No",
      };
    }
  } else if (deviceType === "laptop") {
    isAdditionalLoading = laptopQuery.isLoading;
    hasAdditionalError = laptopQuery.isError;

    if (laptopQuery.data?.laptop && laptopQuery.data?.laptop?.length > 0) {
      const laptop = laptopQuery.data.laptop[0];
      additionalData = {
        "Memoria RAM": `${laptop.ram} GB`,
        Color: laptop.color,
        Procesador: laptop.processor,
        "Sistema operativo": laptop.operatingSystem,
        "Teclado retroiluminado": laptop.backlitKeyboard ? "Sí" : "No",
        "Tarjeta gráfica": laptop.graphicCard,
        "Puertos USB": laptop.usbPorts,
        "Puertos USB-C": laptop.usbCPorts,
        WiFi: laptop.withWifi ? "Sí" : "No",
        Bluetooth: laptop.withBluetooth ? "Sí" : "No",
      };
    }
  }

  if (isAdditionalLoading) {
    return <FeatureTableSkeleton />;
  }

  if (hasAdditionalError) {
    return <p>Error al obtener la información adicional</p>;
  }

  if (!additionalData) {
    return null;
  }

  return (
    <div>
      <p className="mb-4 text-lg font-semibold">Características generales</p>
      <FeatureTable
        headers={Object.keys(additionalData)}
        data={additionalData}
      />
    </div>
  );
}

export default ProductGeneralFeatures;
