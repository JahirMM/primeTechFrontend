import AuthBackButton from "../AuthBackButton";

function LoginFormSection() {
  return (
    <section className="flex flex-col justify-center px-10 py-5 space-y-4 bg-white lg:px-40 md:space-y-10">
      <AuthBackButton />
      <h1 className="text-2xl font-bold uppercase">Sign in</h1>
      <form action="/login" method="post">
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

export default LoginFormSection;
