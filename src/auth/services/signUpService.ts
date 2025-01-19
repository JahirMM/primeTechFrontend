import { getInitialApi } from "@/share/hook/useInitialApi";
import { SignUpResponseInterface } from "../interfaces/signUpResponseInterface";

export const fetchSignUp = async (
  data: SignUpDataInterface
): Promise<SignUpResponseInterface> => {
  const initialApi = getInitialApi();

  const response = await initialApi.post("/auth/signUp", data);
  return response.data;
};
