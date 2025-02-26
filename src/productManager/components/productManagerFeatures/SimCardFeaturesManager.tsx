import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { validateNonNegativeNumber } from "@/share/utils/validateNonNegativeNumber";
import { removeNumericCharacters } from "@/share/utils/removeNumericCharacters";

import { AddSimCardInterface } from "@/addProduct/interfaces/addSimCardInterface";

import { useAddSimCard } from "@/addProduct/hook/useAddSimCard";

import FeatureTable from "@/share/components/FeatureTable";
import { useUpdateSimCard } from "@/updateProduct/hook/useUpdateSimCard";
import { useGetSimCard } from "@/share/hook/useGetSimCard";
import { GetSimCardResponseInterface } from "@/share/interfaces/getSimCardResponseInterface";
import { SimCardInterface } from "@/share/interfaces/simCardInterface";

interface SimCardField {
  label: string;
  key: string;
  type: "text" | "number" | "checkbox";
  validation?: (value: string) => string;
}

const simCardFields: SimCardField[] = [
  { label: "Doble SIM", key: "isDualSim", type: "checkbox" },
  {
    label: "Ranuras SIM",
    key: "simSlots",
    type: "number",
    validation: (value) => validateNonNegativeNumber(value),
  },
  { label: "eSIM", key: "esim", type: "checkbox" },
  {
    label: "Tipo de SIM",
    key: "simType",
    type: "text",
    validation: (value) => removeNumericCharacters(value),
  },
];

function SimCardFeaturesManager({
  mobileDeviceId,
  productId,
}: {
  mobileDeviceId: string;
  productId: string | undefined
}) {
  const simCardResponse = productId ? useGetSimCard(productId) : null;
  const mutationAddSimCard = useAddSimCard();
  const mutationUpdateSimCard = useUpdateSimCard();

  const simCardDataResponse = simCardResponse?.data ?? null;

  const [isDisabled, setIsDisabled] = useState(true);
  const [simCard, setSimCard] = useState(() =>
    simCardFields.reduce((acc, field) => {
      acc[field.key] = field.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, string | boolean>)
  );

  const parseSimCardData = (
    simCardData?: GetSimCardResponseInterface | null
  ) => {
    return simCardFields.reduce((acc, field) => {
      let value =
        simCardData?.simCard[0]?.[field.key as keyof SimCardInterface];

      if (value !== undefined) {
        if (field.type === "checkbox") {
          acc[field.key] = Boolean(value);
        } else if (field.type === "number") {
          acc[field.key] = String(value).replace(/[^\d.]/g, "");
        } else {
          acc[field.key] = String(value);
        }
      } else {
        acc[field.key] = field.type === "checkbox" ? false : "";
      }

      return acc;
    }, {} as Record<string, string | boolean>);
  };

  useEffect(() => {
    if (simCardResponse?.data) {
      console.log(
        "Se obtuvo la información del SIM Card:",
        simCardResponse.data
      );
      setSimCard(parseSimCardData(simCardResponse.data));
    }
  }, [simCardResponse?.data]);

  const handleCancel = useCallback(() => {
    if (simCardResponse?.data) {
      setSimCard(parseSimCardData(simCardResponse.data));
    }
    setIsDisabled(true);
  }, [simCardResponse, setSimCard, setIsDisabled]);

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

    console.log("VOY A ENTRAR EN UNOS DE LOS IF CON :");
    console.log(mobileDeviceId);

    if (!simCardDataResponse || !simCardDataResponse.simCard?.length) {
      try {
        await mutationAddSimCard.mutateAsync({
          mobileDeviceId,
          simCardData: simCardRequest,
        });
        return;
      } catch (error) {
        console.error("Error al agregar SIM Card:", error);
        return;
      }
    }

    if (simCardDataResponse !== null) {
      try {
        await mutationUpdateSimCard.mutateAsync({
          simCardId: simCardDataResponse.simCard[0].simCardId,
          simCardData: simCardRequest,
        });
        setIsDisabled(true);
        return;
      } catch (error) {
        return;
      }
    }
  };

  return (
    <FeatureTable
      setDisabled={setIsDisabled}
      data={simCard}
      setData={setSimCard}
      isDisabled={isDisabled}
      fields={simCardFields}
      title="Sim Card"
      manageFeature={addSimCard}
      handleCancel={handleCancel}
    />
  );
}

export default SimCardFeaturesManager;
