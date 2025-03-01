import { OfferInterface } from "@/offer/interface/offerInterface";

export interface AddOfferInterface
  extends Omit<OfferInterface, "offerId" | "productId" | "active"> {}
