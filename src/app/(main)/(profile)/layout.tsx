import ProfileNav from "@/profile/components/ProfileNav";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 mt-14 sm:min-h-[calc(100vh-58px)] sm:px-5 sm:grid-cols-4 lg:grid-cols-6">
      <ProfileNav />
      <section className="relative z-0 p-3 mt-24 sm:col-start-2 sm:col-end-5 sm:mt-0 sm:py-5 lg:col-end-7">
        {children}
      </section>
    </div>
  );
}
