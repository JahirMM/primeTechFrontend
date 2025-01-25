import { SuccessResponseInterface } from "@/share/interfaces/successResponseInterface";
import { UserImageInterface } from "@/profile/interfaces/userImageInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";
import { GetUserImageResponseInterface } from "../interfaces/getUserImageResponseInterface";

const initialApi = getInitialApi();

export const getUserImage = async (): Promise<GetUserImageResponseInterface> => {
  const response = await initialApi.get("/user-image");
  return response.data;
};

export const uploadUserImage = async (
  file: File
): Promise<SuccessResponseInterface> => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await initialApi.post("/user-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
