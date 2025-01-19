import ForwardedCustomPasswordInputField from "@/share/components/CustomPasswordInputField";
import React, { RefObject, useState } from "react";

function SignUpPasswordValidation({
  passwordRef,
  repeatPasswordRef,
}: {
  passwordRef: RefObject<HTMLInputElement>;
  repeatPasswordRef: RefObject<HTMLInputElement>;
}) {
  const [showMessageError, setShowMessageError] = useState(false);

  const handlePassword = () => {
    if (passwordRef.current?.value !== repeatPasswordRef.current?.value) {
      setShowMessageError(true);
      return;
    }
    setShowMessageError(false);
  };

  return (
    <>
      <ForwardedCustomPasswordInputField
        id="password"
        name="password"
        label="Contraseña"
        required={true}
        autoComplete="new-password"
        defaultValue={""}
        placeholder="Ingrese su contraseña"
        classContainer="mb-4"
        onChange={handlePassword}
        ref={passwordRef}
      />
      <ForwardedCustomPasswordInputField
        id="repeatPassword"
        name="repeatPassword"
        label="Repetir contraseña"
        required={true}
        autoComplete="new-password"
        defaultValue={""}
        placeholder="Ingrese su contraseña"
        classInputGroup={`${showMessageError ? "border-red-500" : ""}`}
        onChange={handlePassword}
        ref={repeatPasswordRef}
      />
      {showMessageError && (
        <span className="mt-2 text-xs text-red-400">
          Las contraseñas deben coincidir
        </span>
      )}
    </>
  );
}

export default SignUpPasswordValidation;
