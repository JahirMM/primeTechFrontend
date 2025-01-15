import { LoginResponseInterface } from "@/auth/interfaces/loginResponseInterface";
import { CredentialsInterface } from "@/auth/interfaces/credentialsInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

export const fetchLogin = async (
  credentials: CredentialsInterface
): Promise<LoginResponseInterface> => {
  const initialApi = getInitialApi();

  const response = await initialApi.post("/auth/login", credentials, {
    withCredentials: true,
  });
  return response.data;
};
