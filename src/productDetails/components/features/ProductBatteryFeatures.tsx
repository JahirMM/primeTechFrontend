import FeatureTableSkeleton from "@/productDetails/skeletons/FeatureTableSkeleton";
import FeatureTable from "@/productDetails/components/features/FeatureTable";
import { useGetBattery } from "@/share/hook/useGetBattery";

function ProductBatteryFeatures({ productId }: { productId: string }) {
  const { data, isLoading, isError } = useGetBattery(productId);

  if (isLoading) return <FeatureTableSkeleton />;
  if (isError) return <div>Error</div>;

  const battery = data?.battery[0];
  const batteryData = {
    Capacidad: battery ? battery.capacity : "N/A",
    Tipo: battery ? battery.type : "N/A",
    "Carga inalámbrica": battery
      ? battery.wirelessCharging
        ? "Sí"
        : "No"
      : "N/A",
    "Carga rápida": battery ? (battery.fastCharging ? "Sí" : "No") : "N/A",
    "Duración máxima de la batería": battery
      ? `${battery.maxBatteryDuration} horas`
      : "N/A",
  };

  return data && data.battery && data.battery.length > 0 ? (
    <div>
      <p className="mb-4 text-lg font-semibold">Batería</p>
      <FeatureTable headers={Object.keys(batteryData)} data={batteryData} />
    </div>
  ) : null;
}

export default ProductBatteryFeatures;
