import { MobileDeviceInterface } from "@/share/interfaces/mobileDeviceInterface";

export type UpdateMobileDeviceInterface = Omit<
  MobileDeviceInterface,
  "mobileDeviceid"
>;
