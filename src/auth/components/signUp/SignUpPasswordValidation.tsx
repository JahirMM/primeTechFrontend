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
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="password" className="text-xs">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          defaultValue={""}
          placeholder="Ingrese una contraseña"
          className="p-2 text-sm border border-gray-500 rounded-xl placeholder:text-xs focus:outline-none"
          autoComplete="new-password"
          ref={passwordRef}
          onChange={handlePassword}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="repeatPassword" className="text-xs">
          Repetir contraseña
        </label>
        <input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          required
          defaultValue={""}
          placeholder="Repita la contraseña"
          className={`p-2 text-sm border rounded-xl placeholder:text-xs ${
            showMessageError ? "border-red-500" : "border-gray-500"
          } focus:outline-none`}
          autoComplete="new-password"
          ref={repeatPasswordRef}
          onChange={handlePassword}
        />
      </div>
      {showMessageError && (
        <span className="mt-2 text-xs text-red-400">
          Las contraseñas deben coincidir
        </span>
      )}
    </>
  );
}

export default SignUpPasswordValidation;
