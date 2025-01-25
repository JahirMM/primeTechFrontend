"use client";

import { useState } from "react";

import PenIcon from "@/icons/PenIcon";
import ProfileForm from "./ProfileForm";

function Profile() {
  const [isDisabled, setIsDisabled] = useState(true);

  const toggleEdit = () => {
    setIsDisabled((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-10 sm:px-10 lg:px-20">
        <h1 className="text-2xl font-bold uppercase">Mi perfil</h1>
        <button
          className="flex items-center px-3 py-2 rounded-xl gap-x-2 bg-primaryColor"
          onClick={toggleEdit}
        >
          <PenIcon className="text-white size-4" />
          <span className="text-xs text-white">Editar</span>
        </button>
      </div>
      <ProfileForm isDisabled={isDisabled} />
    </>
  );
}

export default Profile;
