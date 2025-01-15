import LoginFormSection from "@/auth/components/login/LoginFormSection";
import LoginHeroSection from "@/auth/components/login/LoginHeroSection";

function page() {
  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <LoginHeroSection />
      <LoginFormSection />
    </main>
  );
}

export default page;
