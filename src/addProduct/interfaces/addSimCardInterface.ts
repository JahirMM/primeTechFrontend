import { SimCardInterface } from "@/share/interfaces/simCardInterface";

export type AddSimCardInterface = Omit<SimCardInterface, "simCardId">;
