// filepath: src/app/auth/login/layout.tsx
import { AuthLayout } from "@/app/components/layout/AuthLayout";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
