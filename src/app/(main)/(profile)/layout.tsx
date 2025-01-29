import ProfileNav from "@/profile/components/ProfileNav";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-14 sm:min-h-[calc(100vh-58px)] sm:px-5">
      <ProfileNav />
      <section className="relative z-0 p-3 mt-32 sm:ml-48 sm:mt-0 sm:pt-9 sm:pb-3">
        {children}
      </section>
    </div>
  );
}
