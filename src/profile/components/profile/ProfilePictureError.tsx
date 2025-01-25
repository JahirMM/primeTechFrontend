import UserIcon from "@/icons/UserIcon";

function ProfilePictureError() {
  return (
    <div className="mb-10 sm:px-10 lg:px-20">
      <div className="relative inline-block">
        <UserIcon className="border border-gray-300 rounded-full cursor-pointer size-20" />
        <span className="absolute text-xs bottom-0 inline-block p-1 bg-white border border-gray-300 rounded-full cursor-pointer right-1">
          error
        </span>
      </div>
    </div>
  );
}

export default ProfilePictureError;
