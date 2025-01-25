import { useQuery } from "@tanstack/react-query";

import { UserResponseInterface } from "@/share/interfaces/userResponseInterface";

import { getUserInformation } from "@/share/services/getUserInformationService";

export const useGetUserInformation = () => {
  return useQuery<UserResponseInterface, Error>({
    queryKey: ["userInformation"],
    queryFn: () => getUserInformation(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
