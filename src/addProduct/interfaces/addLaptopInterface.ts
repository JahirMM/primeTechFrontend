import { LaptopInterface } from "@/share/interfaces/laptopInterface";

export interface AddLaptopInterface extends Omit<LaptopInterface, "laptopId"> {}
