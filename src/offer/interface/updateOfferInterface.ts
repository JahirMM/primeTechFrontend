import { OfferInterface } from "@/offer/interface/offerInterface";

export interface UpdateOfferInterface
  extends Omit<OfferInterface, "offerId" | "productId" | "active"> {}
