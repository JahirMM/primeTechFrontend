import { useState } from "react";
import AddFeatureTable from "./AddFeatureTable";

function AddSimCard() {
  const [simCard, setSimCard] = useState({
    "Doble SIM": false,
    "Ranuras SIM": "",
    eSIM: false,
    "Tipo de SIM": "",
  });
  return (
    <div>
      <h2 className="mt-6 text-lg font-semibold">Tarjeta SIM</h2>
      <AddFeatureTable data={simCard} setData={setSimCard} />
    </div>
  );
}

export default AddSimCard;
