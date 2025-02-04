export interface BatteryInterface {
  batteryId: string;
  capacity: string;
  type: string;
  wirelessCharging: boolean;
  fastCharging: boolean;
  maxBatteryDuration: number;
}
