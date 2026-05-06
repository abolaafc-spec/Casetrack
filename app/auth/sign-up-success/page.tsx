import Link from "next/link"
import { Mail } from "lucide-react"
import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <AuthShell
      title="Check your email."
      subtitle="We sent a confirmation link to verify your address. Once confirmed, you can sign in."
    >
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Mail className="h-6 w-6" />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Didn&apos;t get the email? Check your spam folder, or try signing in
          directly — some institutions deliver mail with a delay.
        </p>
      </div>

      <Link href="/auth/login" className="mt-6 block">
        <Button size="full">Continue to sign in</Button>
      </Link>
    </AuthShell>
  )
}
