import { SimCardInterface } from "@/share/interfaces/simCardInterface";

export interface UpdateSimCardInterface
  extends Omit<SimCardInterface, "simCardId"> {}
