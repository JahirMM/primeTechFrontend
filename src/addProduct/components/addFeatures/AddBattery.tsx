import { useState } from "react";

import AddFeatureTable from "./AddFeatureTable";

function AddBattery() {
  const [battery, setBattery] = useState({
    Capacidad: "",
    "Tipo de batería": "",
    "Carga inalámbrica": false,
    "Carga rápida": false,
    "Duración máxima": "",
  });

  return (
    <div>
      <h2 className="mt-6 text-lg font-semibold">Batería</h2>
      {/* 📌 Sección de batería */}
      <AddFeatureTable data={battery} setData={setBattery} />
    </div>
  );
}

export default AddBattery;
