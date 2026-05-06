import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back."
      subtitle="Sign in to access your patients and case notes."
      footer={
        <>
          New here?{" "}
          <Link href="/auth/sign-up" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  )
}
