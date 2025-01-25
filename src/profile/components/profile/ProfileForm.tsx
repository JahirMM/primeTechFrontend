import { useRef } from "react";

import ForwardedCustomInputField from "@/share/components/CustomInputField";
import { handleTextInput } from "@/share/utils/sanitizeTextInput";

import PenIcon from "@/icons/PenIcon";

function ProfileForm({ isDisabled }: { isDisabled: boolean }) {
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const middleNameRef = useRef<HTMLInputElement | null>(null);
  const paternalSurnameRef = useRef<HTMLInputElement | null>(null);
  const maternalSurnameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  
  return (
    <form action="/profile" method="post" className="sm:px-10 lg:px-20">
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
          classInput={`border-none`}
          disabled={true}
          ref={emailRef}
        />
        <button>
          <PenIcon className="size-4" />
        </button>
      </div>
      <button
        type="submit"
        className="w-full px-2 py-3 mt-8 text-sm font-bold text-white uppercase bg-primaryColor rounded-xl"
      >
        Guardar cambios
      </button>
    </form>
  );
}

export default ProfileForm;
