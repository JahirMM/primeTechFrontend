import { LaptopInterface } from "@/share/interfaces/laptopInterface";

export interface UpdateLaptopInterface
  extends Omit<LaptopInterface, "laptopId"> {}
