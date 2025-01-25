import { getInitialApi } from "@/share/hook/useInitialApi";
import { UserResponseInterface } from "../interfaces/userResponseInterface";

export const getUserInformation = async (): Promise<UserResponseInterface> => {
  const initialApi = getInitialApi();
  const response = await initialApi.get("/user");

  return response.data;
};
