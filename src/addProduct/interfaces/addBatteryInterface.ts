import { BatteryInterface } from "@/share/interfaces/batteryInterface";

export interface AddBatteryInterface extends Omit<BatteryInterface, "batteryId"> {}
