"use client";

import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRef } from "react";

import ForwardedCustomInputField from "@/share/components/CustomInputField";
import SignUpPasswordValidation from "./SignUpPasswordValidation";
import AuthBackButton from "../AuthBackButton";

import { handleTextInput } from "@/share/utils/sanitizeTextInput";
import { isValidEmail } from "@/share/utils/validEmail";

import { useSignUp } from "@/auth/hooks/useSignUp";
import { useLogin } from "@/auth/hooks/useLogin";

function SignUpFormSection() {
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const middleNameRef = useRef<HTMLInputElement | null>(null);
  const paternalSurnameRef = useRef<HTMLInputElement | null>(null);
  const maternalSurnameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const repeatPasswordRef = useRef<HTMLInputElement | null>(null);

  const mutationSignUp = useSignUp();
  const mutationLogin = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      firstName: firstNameRef.current?.value.trim() || "",
      middleName: middleNameRef.current?.value.trim() || "",
      paternalSurname: paternalSurnameRef.current?.value.trim() || "",
      maternalSurname: maternalSurnameRef.current?.value.trim() || "",
      email: emailRef.current?.value.trim() || "",
      password: passwordRef.current?.value || "",
      repeatPassword: repeatPasswordRef.current?.value || "",
    };

    if (
      !formData.firstName ||
      !formData.paternalSurname ||
      !formData.maternalSurname ||
      !formData.email ||
      !formData.password ||
      !formData.repeatPassword
    ) {
      toast.error("Por favor llenar todos los campos", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Ingrese un correo valido", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      toast.error("Las contraseñas deben coincidir", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    const dataRequest = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      middleName: formData.middleName,
      paternalSurname: formData.paternalSurname,
      maternalSurname: formData.maternalSurname,
    };

    try {
      await mutationSignUp.mutateAsync(dataRequest);

      setTimeout(() => {
        mutationLogin.mutate({
          email: dataRequest.email,
          password: dataRequest.password,
        });
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, {
          duration: 5000,
          style: { backgroundColor: "#FF5353", color: "white" },
        });
      } else {
        toast.error("Ocurrió un error desconocido.", {
          duration: 5000,
          style: { backgroundColor: "#FF5353", color: "white" },
        });
      }
    }
  };

  return (
    <section className="flex flex-col justify-center px-10 py-5 space-y-4 bg-white">
      <AuthBackButton />
      <h1 className="text-2xl font-bold uppercase">Crear cuenta</h1>
      <form action="/signUp" method="post" onSubmit={handleSubmit}>
        <div className="mb-4 sm:grid sm:grid-cols-2 sm:gap-x-5">
          <ForwardedCustomInputField
            id="firstName"
            name="firstName"
            label="Primer nombre"
            type="text"
            placeholder="Ingrese su primer nombre"
            required={true}
            autoComplete="given-name"
            onInput={handleTextInput}
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
            onInput={handleTextInput}
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
            ref={maternalSurnameRef}
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
          ref={emailRef}
        />
        <SignUpPasswordValidation
          passwordRef={passwordRef}
          repeatPasswordRef={repeatPasswordRef}
        />
        <button
          type="submit"
          className="w-full px-2 py-3 mt-8 text-sm font-bold text-white uppercase bg-primaryColor rounded-xl"
        >
          Continuar
        </button>
      </form>
    </section>
  );
}

export default SignUpFormSection;
