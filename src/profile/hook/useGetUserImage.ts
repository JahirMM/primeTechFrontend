import { useQuery } from "@tanstack/react-query";

import { UserImageInterface } from "@/profile/interfaces/userImageInterface";

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