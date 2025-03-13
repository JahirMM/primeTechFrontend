function LoginFormSubmitButton() {
  return (
    <button
      type="submit"
      className="w-full px-2 py-3 text-sm font-bold text-white uppercase bg-primaryColor rounded-xl"
      aria-label="Continuar"
    >
      Continuar
      <span className="sr-only">Continuar</span>
    </button>
  );
}

export default LoginFormSubmitButton;
