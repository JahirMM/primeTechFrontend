"use client";

import LoginFormSubmitButton from "./LoginFormSubmitButton";
import AuthBackButton from "../AuthBackButton";
import { useRef } from "react";
import { useLogin } from "@/auth/hooks/useLogin";
import { toast } from "sonner";

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
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="text-sm">
            Correo
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="p-2 border border-gray-500 rounded-xl"
            required
            autoComplete="username"
            defaultValue=""
            ref={emailRef}
          />
        </div>
        <div className="flex flex-col mt-4 mb-8 gap-y-2 md:mt-8 md:mb-12">
          <label htmlFor="password" className="text-sm">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="p-2 border border-gray-500 rounded-xl"
            required
            autoComplete="current-password"
            defaultValue=""
            ref={passwordRef}
          />
        </div>
        <LoginFormSubmitButton />
      </form>
    </section>
  );
}

export default LoginFormSection;
