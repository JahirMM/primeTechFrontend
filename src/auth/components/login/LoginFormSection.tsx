"use client";

import { useRef } from "react";
import { toast } from "sonner";

import { useLogin } from "@/auth/hooks/useLogin";

import ForwardedCustomPasswordInputField from "@/share/components/CustomPasswordInputField";
import LoginFormSubmitButton from "@/auth/components/login/LoginFormSubmitButton";
import ForwardedCustomInputField from "@/share/components/CustomInputField";
import AuthBackButton from "@/auth/components/AuthBackButton";

function LoginFormSection() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const mutationLogin = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailRef.current?.value || !passwordRef.current?.value) {
      toast.error("Por favor llenar todos los campos", {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
      return;
    }

    await mutationLogin.mutate({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <section className="flex flex-col justify-center px-10 py-5 space-y-4 bg-white lg:px-40 md:space-y-10">
      <AuthBackButton />
      <h1 className="text-2xl font-bold uppercase">Iniciar sesión</h1>
      <form action="/login" method="post" onSubmit={handleSubmit}>
        <ForwardedCustomInputField
          id="email"
          name="email"
          label="Correo"
          type="email"
          required={true}
          autoComplete="username"
          defaultValue=""
          placeholder="Ingrese su correo"
          classInput="p-2 border border-gray-500 rounded-xl focus:outline-none"
          ref={emailRef}
        />
        <ForwardedCustomPasswordInputField
          id="password"
          name="password"
          label="Contraseña"
          required={true}
          autoComplete="current-password"
          defaultValue={""}
          placeholder="Ingrese su contraseña"
          classContainer="mt-4 mb-8 md:mt-8 md:mb-12"
          ref={passwordRef}
        />
        <LoginFormSubmitButton />
      </form>
    </section>
  );
}

export default LoginFormSection;
