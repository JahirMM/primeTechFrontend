import Header from "@/share/components/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="mt-11">{children}</main>
    </>
  );
}
