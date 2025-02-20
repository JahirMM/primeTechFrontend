import { useState } from "react";
import { toast } from "sonner";

import { validateNonNegativeNumber } from "@/share/utils/validateNonNegativeNumber";
import { removeNumericCharacters } from "@/share/utils/removeNumericCharacters";

import { AddSimCardInterface } from "@/addProduct/interfaces/addSimCardInterface";

import { useAddSimCard } from "@/addProduct/hook/useAddSimCard";

import FeatureTable from "@/share/components/FeatureTable";

interface SimCardField {
  label: string;
  key: string;
  type: "text" | "number" | "checkbox";
  validation?: (value: string) => string;
}

const simCardFields: SimCardField[] = [
  { label: "Doble SIM", key: "isDualSim", type: "checkbox" },
  { label: "Ranuras SIM", key: "simSlots", type: "number", validation: (value) => validateNonNegativeNumber(value) },
  { label: "eSIM", key: "esim", type: "checkbox" },
  { label: "Tipo de SIM", key: "simType", type: "text", validation: (value) => removeNumericCharacters(value)}
];

function AddSimCard({ mobileDeviceId }: { mobileDeviceId: string }) {
  const mutationAddSimCard = useAddSimCard();

  const [isDisabled, setIsDisabled] = useState(false);

  const [simCard, setSimCard] = useState(() =>
    simCardFields.reduce((acc, field) => {
      acc[field.key] = field.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, string | boolean>)
  );

  const addSimCard = async () => {
    if (!simCard.simSlots || !simCard.simType) {
      toast.error("Ingresar toda la información obligatoria", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    const simCardRequest: AddSimCardInterface = {
      isDualSim: Boolean(simCard.isDualSim),
      simSlots: Number(simCard.simSlots),
      esim: Boolean(simCard.esim),
      simType: simCard.simType.toString(),
    };

    try {
      await mutationAddSimCard.mutateAsync({
        mobileDeviceId,
        simCardData: simCardRequest,
      });
      setIsDisabled(true);
    } catch (error) {
      return;
    }
  };

  return (
    <FeatureTable
      data={simCard}
      setData={setSimCard}
      isDisabled={isDisabled}
      fields={simCardFields}
      title="Sim Card"
      manageFeature={addSimCard}
      buttonText="agregar"
    />
  );
}

export default AddSimCard;
