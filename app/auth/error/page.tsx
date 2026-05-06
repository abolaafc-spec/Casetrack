import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
  return (
    <AuthShell
      title="Something went wrong."
      subtitle="We couldn&apos;t complete that authentication step. Please try again."
    >
      <Link href="/auth/login" className="block">
        <Button size="full">Back to sign in</Button>
      </Link>
    </AuthShell>
  )
}
