import { OfferInterface } from "@/offer/interface/offerInterface";

export type UpdateOfferInterface = Omit<
  OfferInterface,
  "offerId" | "productId" | "active"
>;
