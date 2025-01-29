import { useQuery } from "@tanstack/react-query";

import { getUserImage } from "@/profile/service/userImageService";
import { GetUserImageResponseInterface } from "../interfaces/getUserImageResponseInterface";

export const useGetUserImage = () => {
  return useQuery<GetUserImageResponseInterface, Error>({
    queryKey: ["userImage"],
    queryFn: getUserImage,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};