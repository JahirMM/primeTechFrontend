import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const logout = async (): Promise<null> => {
  const response = await initialApi.post("/auth/logout");
  return response.data;
};
