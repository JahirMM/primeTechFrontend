import { ScreenInterface } from "@/share/interfaces/screenInterface";

export type AddScreenInterface = Omit<ScreenInterface, "screenId">;
