import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"
import { SignUpForm } from "@/components/auth/sign-up-form"

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your account."
      subtitle="Set up your private workspace in under a minute."
      footer={
        <>
          Already a member?{" "}
          <Link href="/auth/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthShell>
  )
}
