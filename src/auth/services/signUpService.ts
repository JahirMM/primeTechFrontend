import { getInitialApi } from "@/share/hook/useInitialApi";

import { SignUpResponseInterface } from "@/auth/interfaces/signUpResponseInterface";
import { SignUpDataInterface } from "@/auth/interfaces/signUpDataInterface";

export const fetchSignUp = async (
  data: SignUpDataInterface
): Promise<SignUpResponseInterface> => {
  const initialApi = getInitialApi();

  const response = await initialApi.post("/auth/signUp", data);
  return response.data;
};
