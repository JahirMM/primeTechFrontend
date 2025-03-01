import { useState } from "react";

import OfferForm from "@/offer/components/OfferForm";
import Modal from "@/share/components/Modal";

import { useDeactivateOffer } from "@/offer/hook/useDeactivateOffer";
import { useActivateOffer } from "@/offer/hook/useActivateOffer";
import { useGetOffer } from "@/offer/hook/useGetOffer";

interface OfferActionsProps {
  productId: string;
}

function OfferActions({ productId }: OfferActionsProps) {
  const mutationActivateOffer = useActivateOffer();
  const mutationDeactivateOffer = useDeactivateOffer();

  const { data: offerData, isLoading: offerLoading } = useGetOffer(productId);
  const [showModal, setShowModal] = useState(false);

  if (offerLoading) {
    return <div>Cargandooo...</div>;
  }

  const activateOffer = (offerId: string) => {
    mutationActivateOffer.mutate({ offerId: offerId });
  };

  const deactivateOffer = (offerId: string) => {
    mutationDeactivateOffer.mutate({ offerId: offerId });
  };

  return (
    <>
      {offerData && offerData.offer && (
        <div className="flex flex-col gap-3">
          <button
            className="px-3 py-2 text-xs text-center transition-colors duration-300 border border-black rounded-lg hover:text-white hover:bg-primaryColor hover:border-primaryColor"
            onClick={() => setShowModal(true)}
          >
            Actualizar oferta
          </button>
          {offerData.offer.active ? (
            <button
              className="px-3 py-2 text-xs text-center transition-colors duration-300 border border-black rounded-lg hover:text-white hover:bg-primaryColor hover:border-primaryColor"
              onClick={() => deactivateOffer(offerData.offer.offerId)}
            >
              Desactivar oferta
            </button>
          ) : (
            <button
              className="px-3 py-2 text-xs text-center transition-colors duration-300 border border-black rounded-lg hover:text-white hover:bg-primaryColor hover:border-primaryColor"
              onClick={() => activateOffer(offerData.offer.offerId)}
            >
              Activar oferta
            </button>
          )}
        </div>
      )}
      {offerData === null && (
        <button
          className="px-3 py-2 text-xs text-center transition-colors duration-300 border border-black rounded-lg hover:text-white hover:bg-primaryColor hover:border-primaryColor"
          onClick={() => setShowModal(true)}
        >
          Agregar oferta
        </button>
      )}
      {showModal && (
        <Modal
          title={offerData ? "Actualizar oferta" : "Agregar oferta"}
          onClose={() => setShowModal(false)}
        >
          <OfferForm
            productId={productId}
            isAdd={!offerData}
            offerData={
              offerData
                ? {
                    offerId: offerData.offer.offerId,
                    percentage: offerData.offer.discountPercentage,
                    startDate: offerData.offer.startDate,
                    endDate: offerData.offer.endDate,
                  }
                : {
                    offerId: "",
                    percentage: 0,
                    startDate: "",
                    endDate: "",
                  }
            }
          />
        </Modal>
      )}
    </>
  );
}

export default OfferActions;
