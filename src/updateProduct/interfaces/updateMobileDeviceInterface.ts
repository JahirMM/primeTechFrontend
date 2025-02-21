import { MobileDeviceInterface } from "@/share/interfaces/mobileDeviceInterface";

export interface UpdateMobileDeviceInterface
  extends Omit<MobileDeviceInterface, "mobileDeviceid"> {}
