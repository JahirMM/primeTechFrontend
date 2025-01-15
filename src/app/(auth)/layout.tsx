import AuthHeader from "@/auth/components/AuthHeader";
import { Toaster } from "sonner";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthHeader />
      {children}
      <Toaster expand={false} position="top-right"/>
    </>
  );
}
