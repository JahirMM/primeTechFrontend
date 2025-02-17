import { useState } from "react";
import AddFeatureTable from "./AddFeatureTable";

function AddLaptop() {
  const [laptop, setLaptop] = useState({
    Tipo: "",
    Resolución: "",
    Apertura: "",
    "Zoom óptico": "",
    "Zoom digital": "",
    Características: "",
  });

  return <AddFeatureTable data={laptop} setData={setLaptop} />;
}

export default AddLaptop;
