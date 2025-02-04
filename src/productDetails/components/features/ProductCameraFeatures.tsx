import { useGetCameras } from "@/share/hook/useGetCameras";
import FeatureTable from "@/productDetails/components/features/FeatureTable";

function ProductCameraFeatures({ productId }: { productId: string }) {
  const { data, isLoading, isError } = useGetCameras(productId);

  if (isLoading) return <div>Cargando ...</div>;
  if (isError) return <div>Error</div>;

  if (!data?.camera || data.camera.length === 0) {
    return <div>No se encontraron cámaras</div>;
  }

  return (
    <div className="col-start-1 col-end-3">
      <p className="mb-4 text-lg font-semibold">Cámaras</p>
      <div className="grid grid-cols-1 gap-x-3 sm:gap-y-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.camera.map((camera, index) => {
          const cameraData = {
            Tipo: camera.type,
            Resolución: camera.resolution,
            Apertura: camera.aperture,
            "Zoom óptico": camera.opticalZoom,
            "Zoom digital": camera.digitalZoom,
            Características: camera.feature,
          };

          return (
            <div key={camera.cameraId}>
              <FeatureTable
                headers={Object.keys(cameraData)}
                data={cameraData}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductCameraFeatures;
