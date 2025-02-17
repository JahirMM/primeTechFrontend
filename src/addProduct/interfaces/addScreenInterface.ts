import { ScreenInterface } from "@/share/interfaces/screenInterface";

export interface AddScreenInterface extends Omit<ScreenInterface, "screenId"> {}
