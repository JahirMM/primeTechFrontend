import { OfferInterface } from "@/offer/interface/offerInterface";

export type AddOfferInterface = Omit<
  OfferInterface,
  "offerId" | "productId" | "active"
>;
