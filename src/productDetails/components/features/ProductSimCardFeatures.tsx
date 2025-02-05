import FeatureTableSkeleton from "@/productDetails/skeletons/FeatureTableSkeleton";
import FeatureTable from "@/productDetails/components/features/FeatureTable";
import { useGetSimCard } from "@/share/hook/useGetSimCard";

function ProductSimCardFeatures({ productId }: { productId: string }) {
  const { data, isLoading, isError } = useGetSimCard(productId);

  if (isLoading) return <FeatureTableSkeleton/>;
  if (isError) return <div>Error</div>;

  const simCard = data?.simCard[0];
  const simCardData = {
    "Dual SIM": simCard ? (simCard.isDualSim ? "Sí" : "No") : "N/A",
    "Ranuras SIM": simCard ? simCard.simSlots : "N/A",
    eSIM: simCard ? (simCard.esim ? "Sí" : "No") : "N/A",
    "Tipo de SIM": simCard ? simCard.simType : "N/A",
  };

  return (
    <div>
      <p className="mb-4 text-lg font-semibold">Tarjeta Sim</p>
      {data && data.simCard && data.simCard.length > 0 ? (
        <FeatureTable headers={Object.keys(simCardData)} data={simCardData} />
      ) : (
        <div>No se encontró información</div>
      )}
    </div>
  );
}

export default ProductSimCardFeatures;
