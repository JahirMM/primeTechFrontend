import { ScreenInterface } from "@/share/interfaces/screenInterface";

export type UpdateScreenInterface = Omit<ScreenInterface, "screenId">;
