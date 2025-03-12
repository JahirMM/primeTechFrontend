import { BatteryInterface } from "@/share/interfaces/batteryInterface";

export type UpdateBatteryInterface = Omit<BatteryInterface, "batteryId">;