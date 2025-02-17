import { useState } from "react";

import AddFeatureTable from "./AddFeatureTable";

function AddScreen() {
  const [screen, setScreen] = useState({
    Resolución: "",
    "Densidad de píxeles": "",
    "Tasa de refresco": "",
    "Tipo de pantalla": "",
    "Tamaño de pantalla": "",
  });

  return (
    <div>
      <h2 className="mt-6 text-lg font-semibold">Pantalla</h2>
      <AddFeatureTable data={screen} setData={setScreen} />
    </div>
  );
}

export default AddScreen;
