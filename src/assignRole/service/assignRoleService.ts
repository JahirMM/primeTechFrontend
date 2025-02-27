import { AssignRoleResponseInterface } from "@/assignRole/interface/assignRoleResponseInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const assignRole = async (
  role: string
): Promise<AssignRoleResponseInterface> => {
  const response = await initialApi.post(`/role/assign/${role}`);

  return response.data;
};
