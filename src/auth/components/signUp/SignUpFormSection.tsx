"use client";

import ForwardedCustomInputField from "@/share/components/CustomInputField";
import AuthBackButton from "../AuthBackButton";

function SignUpFormSection() {
  return (
    <section className="flex flex-col justify-center px-10 py-5 space-y-4 bg-white">
      <AuthBackButton />
      <h1 className="text-2xl font-bold uppercase">Crear cuenta</h1>
      <form action="/signUp" method="post">
        <div className="mb-4 sm:grid sm:grid-cols-2 sm:gap-x-5">
          <ForwardedCustomInputField
            id="firstName"
            name="firstName"
            label="Primer nombre"
            type="text"
            placeholder="Ingrese su primer nombre"
            required={true}
            autoComplete="given-name"
          />
          <ForwardedCustomInputField
            id="middleName"
            name="middleName"
            label="Segundo nombre"
            type="text"
            placeholder="Ingrese su segundo nombre"
            required={false}
            autoComplete="additional-name"
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
          />
          <ForwardedCustomInputField
            id="maternalSurname"
            name="maternalSurname"
            label="Apellido materno"
            type="text"
            placeholder="Ingrese su apellido materno"
            required={false}
            autoComplete="family-name"
          />
        </div>
        <ForwardedCustomInputField
          id="email"
          name="email"
          label="Correo"
          type="text"
          placeholder="Ingrese su correo"
          required={true}
          classContainer="mb-4"
          autoComplete="email"
        />
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
            className="p-2 text-sm border border-gray-500 rounded-xl placeholder:text-xs"
            autoComplete="new-password"
          />
        </div>
        <div className="flex flex-col gap-2 mb-8">
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
            className="p-2 text-sm border border-gray-500 rounded-xl placeholder:text-xs"
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          className="w-full px-2 py-3 text-sm font-bold text-white uppercase bg-primaryColor rounded-xl"
        >
          Continuar
        </button>
      </form>
    </section>
  );
}

export default SignUpFormSection;
