import SignUpFormSection from "@/auth/components/signUp/SignUpFormSection";
import AuthHeroSection from "@/auth/components/AuthHeroSection";

function page() {
  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <AuthHeroSection
        imgUrl="/images/signUp/img-signUp.svg"
        alt="Sign-up image"
      />
      <SignUpFormSection />
    </main>
  );
}

export default page;
