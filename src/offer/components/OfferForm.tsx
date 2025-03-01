import { useEffect, useState } from "react";

import { validateNonNegativeNumber } from "@/share/utils/validateNonNegativeNumber";

import { useUpdateOffer } from "@/offer/hook/useUpdateOffer";
import { useAddOffer } from "@/offer/hook/useAddOffer";

interface Offer {
  offerId: string;
  percentage: number;
  startDate: string;
  endDate: string;
}

interface OfferFormProps {
  isAdd: boolean;
  productId: string;
  offerData: Offer;
}

const formatDate = (date: string) => {
  return date ? new Date(date).toISOString().split("T")[0] : "";
};

function OfferForm({ productId, isAdd, offerData }: OfferFormProps) {
  const mutationAddOffer = useAddOffer();
  const mutationUpdateOffer = useUpdateOffer();

  const [percentage, setPercentage] = useState(offerData.percentage.toString());
  const [startDate, setStartDate] = useState(formatDate(offerData.startDate));
  const [endDate, setEndDate] = useState(formatDate(offerData.endDate));

  const [error, setError] = useState("");

  useEffect(() => {
    setPercentage(offerData.percentage.toString());
    setStartDate(formatDate(offerData.startDate));
    setEndDate(formatDate(offerData.endDate));
  }, [offerData]);

  const handlePercentageChange = (value: string) => {
    const validatedValue = validateNonNegativeNumber(value);
    setPercentage(validatedValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!percentage.trim() || !startDate || !endDate) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const parsedPercentage = Number(percentage);

    if (isNaN(parsedPercentage) || parsedPercentage <= 0) {
      setError("El porcentaje debe ser un número mayor a 0.");
      return;
    }

    if (endDate < startDate) {
      setError("La fecha de término no puede ser menor a la fecha de inicio.");
      return;
    }

    const formatToLocalDateTime = (date: string) => `${date}T00:00:00`;

    const requestData = {
      discountPercentage: parsedPercentage,
      startDate: formatToLocalDateTime(startDate),
      endDate: formatToLocalDateTime(endDate),
    };

    if (isAdd) {
      mutationAddOffer.mutate({
        productId: productId,
        offerData: requestData,
      });
    } else {
      if (offerData.offerId) {
        mutationUpdateOffer.mutate({
          offerId: offerData.offerId,
          offerData: requestData,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <div className="mb-4">
        <label
          htmlFor="percentage"
          className="block text-sm font-medium text-gray-700"
        >
          Porcentaje de la oferta
        </label>
        <input
          type="number"
          id="percentage"
          value={percentage}
          onChange={(e) => handlePercentageChange(e.target.value)}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          Fecha de inicio
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700"
        >
          Fecha de término
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-white rounded-lg bg-primaryColor hover:bg-primaryDarkColor"
        >
          {offerData ? "Actualizar" : "Agregar"} oferta
        </button>
      </div>
    </form>
  );
}

export default OfferForm;
