import { LaptopInterface } from "@/share/interfaces/laptopInterface";

export type UpdateLaptopInterface = Omit<LaptopInterface, "laptopId">;
