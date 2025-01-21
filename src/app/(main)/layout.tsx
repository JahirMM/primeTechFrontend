import Header from "@/share/components/Header";
import { Toaster } from "sonner";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="mt-11">{children}</main>
      <Toaster expand={false} position="top-right"/>
    </>
  );
}
