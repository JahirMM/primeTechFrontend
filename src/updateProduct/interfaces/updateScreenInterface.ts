import { ScreenInterface } from "@/share/interfaces/screenInterface";

export interface UpdateScreenInterface
  extends Omit<ScreenInterface, "screenId"> {}
