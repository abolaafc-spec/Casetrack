"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input, Label, Select } from "@/components/ui/input"

export function SignUpForm() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState("doctor")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
          `${window.location.origin}/auth/callback`,
        data: { full_name: fullName, role },
      },
    })
    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }
    router.push("/auth/sign-up-success")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="full_name">Full name</Label>
        <Input
          id="full_name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Dr. Anika Patel"
          autoComplete="name"
        />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <Select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="doctor">Doctor</option>
          <option value="surgeon">Surgeon</option>
          <option value="resident">Resident</option>
          <option value="intern">Intern</option>
          <option value="medical_student">Medical student</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="email">Work email</Label>
        <Input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@hospital.org"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
        />
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <Button type="submit" size="full" disabled={loading} className="mt-2">
        {loading ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        By continuing you agree to keep all patient information confidential and
        compliant with your institution&apos;s policies.
      </p>
    </form>
  )
}
