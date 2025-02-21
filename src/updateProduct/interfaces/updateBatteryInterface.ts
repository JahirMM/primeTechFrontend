import { BatteryInterface } from "@/share/interfaces/batteryInterface";

export interface UpdateBatteryInterface
  extends Omit<BatteryInterface, "batteryId"> {}
