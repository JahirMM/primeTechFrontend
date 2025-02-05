import FeatureTableSkeleton from "@/productDetails/skeletons/FeatureTableSkeleton";
import FeatureTable from "@/productDetails/components/features/FeatureTable";
import { useGetScreen } from "@/share/hook/useGetScreen";

function ProductScreenFeatures({ productId }: { productId: string }) {
  const { data, isLoading, isError } = useGetScreen(productId);

  if (isLoading) return <FeatureTableSkeleton />;
  if (isError) return <div>Error</div>;

  const screen = data?.screen[0];
  const screenData = {
    Resolución: screen ? screen.resolution : "N/A",
    "Densidad de píxeles": screen ? screen.pixelDensity : "N/A",
    "Frecuencia de actualización": screen ? screen.refreshRate : "N/A",
    "Tipo de pantalla": screen ? screen.screenType : "N/A",
    "Tamaño de pantalla": screen ? `${screen.screenSize} pulgadas` : "N/A",
  };

  return (
    <div>
      <p className="mb-4 text-lg font-semibold">Pantalla</p>
      {data && data.screen && data.screen.length > 0 ? (
        <FeatureTable headers={Object.keys(screenData)} data={screenData} />
      ) : (
        <div>No se encontró información</div>
      )}
    </div>
  );
}

export default ProductScreenFeatures;
