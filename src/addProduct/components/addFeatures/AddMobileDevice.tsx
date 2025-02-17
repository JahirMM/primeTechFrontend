import { useState } from "react";
import AddFeatureTable from "./AddFeatureTable";

function AddMobileDevice() {
  const [mobileDevice, setMobileDevice] = useState({
    Tipo: "",
    Resolución: "",
    Apertura: "",
    "Zoom óptico": "",
    "Zoom digital": "",
    Características: "",
  });
  return <AddFeatureTable data={mobileDevice} setData={setMobileDevice} />;
}

export default AddMobileDevice;
