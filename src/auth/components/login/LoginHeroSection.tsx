function LoginHeroSection() {
  return (
    <section className="flex flex-col items-center justify-center p-2 bg-sectionColor bg-[url('/images/login/linear-background.svg')] bg-cover bg-no-repeat md:justify-around">
      <img
        src="/images/login/img-login.gif"
        alt="Animated login illustration"
        className="size-[216px] sm:size-[232px] md:size-[288px] lg:size-[488px]"
      />
    </section>
  );
}

export default LoginHeroSection;
