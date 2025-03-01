import { SuccessResponseInterface } from "@/share/interfaces/successResponseInterface";
import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const changeEmail = async (data: {
  email: string;
  password: string;
}): Promise<SuccessResponseInterface> => {
  const response = await initialApi.post("/change-email", data);
  return response.data;
};
