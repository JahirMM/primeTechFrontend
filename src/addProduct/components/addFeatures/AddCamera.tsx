import { useState } from "react";

import AddFeatureTable from "./AddFeatureTable";

function AddCamera() {
  const [camera, setCamera] = useState({
    Tipo: "",
    Resolución: "",
    Apertura: "",
    "Zoom óptico": "",
    "Zoom digital": "",
    Características: "",
  });
  return (
    <div className="sm:col-start-1 sm:col-end-3">
      <h2 className="mt-6 text-lg font-semibold">Cámaras</h2>
      <AddFeatureTable data={camera} setData={setCamera} />
    </div>
  );
}

export default AddCamera;
