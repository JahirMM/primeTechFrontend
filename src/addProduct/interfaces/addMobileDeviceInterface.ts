import { MobileDeviceInterface } from "@/share/interfaces/mobileDeviceInterface";

export interface AddMobileDeviceInterface
  extends Omit<MobileDeviceInterface, "mobileDeviceid"> {}
