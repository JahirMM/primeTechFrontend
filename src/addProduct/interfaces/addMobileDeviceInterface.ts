import { MobileDeviceInterface } from "@/share/interfaces/mobileDeviceInterface";

export type AddMobileDeviceInterface = Omit<
  MobileDeviceInterface,
  "mobileDeviceid"
>;
