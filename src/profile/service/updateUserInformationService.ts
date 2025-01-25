import { UserResponseInterface } from "@/share/interfaces/userResponseInterface";

import { UserEditInfoType } from "@/profile/interfaces/userEditInfoInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

export const updateUserInformation = async (
  userInfo: UserEditInfoType
): Promise<UserResponseInterface> => {
  const initialApi = getInitialApi();
  const response = await initialApi.put("/user", userInfo);
  return response.data;
};
