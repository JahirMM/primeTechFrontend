import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import ForwardedCustomInputField from "@/share/components/CustomInputField";
import ChangeEmailForm from "@/profile/components/profile/ChangeEmailForm";
import Modal from "@/share/components/Modal";

import { handleTextInput } from "@/share/utils/sanitizeTextInput";

import { useUpdateUserInformation } from "@/profile/hook/useUpdateUserInformarion";
import { useGetUserInformation } from "@/share/hook/useGetUserInformation";

import PenIcon from "@/icons/PenIcon";

function ProfileForm({
  isDisabled,
  setIsDisabled,
}: {
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: userInformation } = useGetUserInformation();

  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const middleNameRef = useRef<HTMLInputElement | null>(null);
  const paternalSurnameRef = useRef<HTMLInputElement | null>(null);
  const maternalSurnameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const mutationUserInformation = useUpdateUserInformation();

  const [showModal, setShowModal] = useState(false);
  const [originalUserData, setOriginalUserData] = useState({
    firstName: "",
    middleName: "",
    paternalSurname: "",
    maternalSurname: "",
    email: "",
  });

  useEffect(() => {
    if (userInformation) {
      setOriginalUserData({
        firstName: userInformation.user.firstName || "",
        middleName: userInformation.user.middleName || "",
        paternalSurname: userInformation.user.paternalSurname || "",
        maternalSurname: userInformation.user.maternalSurname || "",
        email: userInformation.user.email || "",
      });
    }
  }, [userInformation]);

  useEffect(() => {
    if (isDisabled) {
      if (firstNameRef.current)
        firstNameRef.current.value = originalUserData.firstName;
      if (middleNameRef.current)
        middleNameRef.current.value = originalUserData.middleName;
      if (paternalSurnameRef.current)
        paternalSurnameRef.current.value = originalUserData.paternalSurname;
      if (maternalSurnameRef.current)
        maternalSurnameRef.current.value = originalUserData.maternalSurname;
      if (emailRef.current) emailRef.current.value = originalUserData.email;
    }
  }, [isDisabled, originalUserData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      firstName: firstNameRef.current?.value.trim() || "",
      middleName: middleNameRef.current?.value.trim() || "",
      paternalSurname: paternalSurnameRef.current?.value.trim() || "",
      maternalSurname: maternalSurnameRef.current?.value.trim() || "",
    };

    if (
      !formData.firstName ||
      !formData.paternalSurname ||
      !formData.maternalSurname
    ) {
      toast.error("Por favor llenar todos los campos", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    const dataRequest = {
      firstName: formData.firstName,
      middleName: formData.middleName,
      paternalSurname: formData.paternalSurname,
      maternalSurname: formData.maternalSurname,
    };

    mutationUserInformation.mutate(dataRequest);
    setIsDisabled((isDisabled) => !isDisabled);
  };

  return (
    <>
      <form
        action="/profile"
        method="post"
        onSubmit={handleSubmit}
        className="sm:px-10 lg:px-20"
      >
        <div className="mb-4 sm:grid sm:grid-cols-2 sm:gap-x-5">
          <ForwardedCustomInputField
            id="firstName"
            name="firstName"
            label="Primer nombre"
            type="text"
            placeholder="Ingrese su primer nombre"
            required={true}
            autoComplete="given-name"
            classContainer="mb-4"
            onInput={handleTextInput}
            classInput={`${isDisabled ? "border-none" : "border"}`}
            disabled={isDisabled}
            ref={firstNameRef}
          />
          <ForwardedCustomInputField
            id="middleName"
            name="middleName"
            label="Segundo nombre"
            type="text"
            placeholder="Ingrese su segundo nombre"
            required={false}
            autoComplete="additional-name"
            onInput={handleTextInput}
            classInput={`${isDisabled ? "border-none" : "border"}`}
            disabled={isDisabled}
            ref={middleNameRef}
          />
        </div>
        <div className="mb-4 sm:grid sm:grid-cols-2 sm:gap-x-5">
          <ForwardedCustomInputField
            id="paternalSurname"
            name="paternalSurname"
            label="Apellido paterno"
            type="text"
            placeholder="Ingrese su apellido paterno"
            required={true}
            autoComplete="family-name"
            classContainer="mb-4"
            onInput={handleTextInput}
            classInput={`${isDisabled ? "border-none" : "border"}`}
            disabled={isDisabled}
            ref={paternalSurnameRef}
          />
          <ForwardedCustomInputField
            id="maternalSurname"
            name="maternalSurname"
            label="Apellido materno"
            type="text"
            placeholder="Ingrese su apellido materno"
            required={false}
            autoComplete="family-name"
            onInput={handleTextInput}
            classInput={`${isDisabled ? "border-none" : "border"}`}
            disabled={isDisabled}
            ref={maternalSurnameRef}
          />
        </div>
        <div className="flex items-center gap-x-3">
          <ForwardedCustomInputField
            id="email"
            name="email"
            label="Correo"
            type="text"
            placeholder="Ingrese su correo"
            required={true}
            classContainer="mb-4 flex-1"
            autoComplete="email"
            classInput={`border-none bg-gray-100`}
            disabled={true}
            ref={emailRef}
          />
          <button type="button" onClick={() => setShowModal(true)}>
            <PenIcon className="size-4" />
          </button>
        </div>
        {!isDisabled && (
          <button
            type="submit"
            className="w-full px-2 py-3 mt-8 text-sm font-bold text-white uppercase bg-primaryColor rounded-xl"
            aria-label="Cancelar cambios"
          >
            Guardar cambios
            <span className="sr-only">Cancelar cambios</span>
          </button>
        )}
      </form>
      {showModal && (
        <Modal title="Cambiar correo" onClose={() => setShowModal(false)}>
          <ChangeEmailForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default ProfileForm;
