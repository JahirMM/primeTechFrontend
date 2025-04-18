import LoginFormSection from "@/auth/components/login/LoginFormSection";
import AuthHeroSection from "@/auth/components/AuthHeroSection";

function page() {
  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <AuthHeroSection
        imgUrl="/images/login/img-login.gif"
        alt="Animated login illustration"
      />
      <LoginFormSection />
    </main>
  );
}

export default page;
