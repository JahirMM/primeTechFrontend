import { SimCardInterface } from "@/share/interfaces/simCardInterface";

export type UpdateSimCardInterface = Omit<SimCardInterface, "simCardId">;
