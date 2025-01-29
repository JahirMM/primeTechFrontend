import UserIcon from "@/icons/UserIcon";
import { useGetUserImage } from "@/profile/hook/useGetUserImage";

const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

function HeaderUserPicture() {
  const { data: dataUserImage, isLoading: userImageLoading } =
    useGetUserImage();

  if (userImageLoading) {
    return <p className="bg-gray-200 rounded-full size-10 animate-pulse"></p>;
  }

  return (
    <>
      {backendDomain && dataUserImage?.userImage?.imageUrl ? (
        <img
          src={backendDomain + dataUserImage.userImage.imageUrl}
          alt="user picture"
          className="rounded-full size-10"
        />
      ) : (
        <UserIcon className="rounded-full size-10" />
      )}
    </>
  );
}

export default HeaderUserPicture;
