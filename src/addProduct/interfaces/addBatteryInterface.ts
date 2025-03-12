import { BatteryInterface } from "@/share/interfaces/batteryInterface";

export type AddBatteryInterface = Omit<BatteryInterface, "batteryId">;
