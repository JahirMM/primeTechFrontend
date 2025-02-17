import { useState } from "react";
import { toast } from "sonner";

import AddFeatureTable from "@/addProduct/components/addFeatures/AddFeatureTable";
import { useAddSimCard } from "@/addProduct/hook/useAddSimCard";

function AddSimCard({ mobileDeviceId }: { mobileDeviceId: string }) {
  const mutationAddSimCard = useAddSimCard();

  const [isDisabled, setIsDisabled] = useState(false);
  const [simCard, setSimCard] = useState({
    "Doble SIM": false,
    "Ranuras SIM": "",
    eSIM: false,
    "Tipo de SIM": "",
  });

  const addSimCard = async () => {
    if (!simCard["Ranuras SIM"] || !simCard["Tipo de SIM"]) {
      toast.error("Ingresar toda la información obligatoria", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    const simCardRequest = {
      isDualSim: simCard["Doble SIM"],
      simSlots: Number(simCard["Ranuras SIM"]),
      esim: simCard.eSIM,
      simType: simCard["Tipo de SIM"],
    };

    try {
      await mutationAddSimCard.mutateAsync({
        mobileDeviceId: mobileDeviceId,
        simCardData: simCardRequest,
      });
      setIsDisabled(true);
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between my-6">
        <h2 className="text-lg font-semibold">Sim Card</h2>
        <button
          className="px-2 py-1 text-xs text-white rounded-lg bg-primaryColor"
          onClick={addSimCard}
        >
          Agregar
        </button>
      </div>
      <AddFeatureTable
        data={simCard}
        setData={setSimCard}
        isDisabled={isDisabled}
      />
    </div>
  );
}

export default AddSimCard;
