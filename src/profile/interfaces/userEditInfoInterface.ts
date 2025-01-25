import { UserInterface } from "@/share/interfaces/userInterface";

export type UserEditInfoType = Omit<
  UserInterface,
  "email" | "createdAt" | "roleNames"
>;
