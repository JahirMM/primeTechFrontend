import { SimCardInterface } from "@/share/interfaces/simCardInterface";

export interface AddSimCardInterface
  extends Omit<SimCardInterface, "simCardId"> {}
