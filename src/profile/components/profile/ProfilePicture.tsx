import { useRef } from "react";

import ProfilePictureError from "@/profile/components/profile/ProfilePictureError";
import ProfilePictureSkeleton from "@/profile/skeletons/ProfilePictureSkeleton";

import { useUploadUserImage } from "@/profile/hook/useUploadUserImage";
import { useGetUserImage } from "@/profile/hook/useGetUserImage";

import CameraIcon from "@/icons/CameraIcon";
import UserIcon from "@/icons/UserIcon";


const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

function ProfilePicture() {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { data, isLoading, isError } = useGetUserImage();
  const mutationUserImage = useUploadUserImage();

  const handleImageClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      mutationUserImage.mutate(file);
    }
  };

  if (isLoading) {
    return <ProfilePictureSkeleton />;
  }

  if (isError) {
    return <ProfilePictureError />;
  }

  return (
    <div className="mb-10 sm:px-10 lg:px-20">
      <div className="relative inline-block">
        {backendDomain && data?.userImage?.imageUrl ? (
          <img
            src={backendDomain + data.userImage.imageUrl}
            alt="user picture"
            className="border border-gray-300 rounded-full cursor-pointer size-20"
            onClick={handleImageClick}
          />
        ) : (
          <UserIcon
            className="border border-gray-300 rounded-full cursor-pointer size-20"
            onClick={handleImageClick}
          />
        )}
        <span
          className="absolute bottom-0 inline-block p-1 bg-white border border-gray-300 rounded-full cursor-pointer right-1"
          onClick={handleImageClick}
        >
          <CameraIcon className="size-3" />
        </span>
      </div>
      <input
        type="file"
        ref={inputFileRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ProfilePicture;
